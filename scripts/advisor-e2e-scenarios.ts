/**
 * Server-side end-to-end scenario tests for POST /api/advisor using a mock Gemini endpoint.
 * Run: bun scripts/advisor-e2e-scenarios.ts
 *
 * - Boots a throwaway instance of server.ts on port 3999 (production mode, static serving)
 *   with a FAKE key and GEMINI_BASE_URL pointed at an in-process mock Gemini server.
 * - Verifies success, 429 quota, 503 unavailable, empty/invalid response, and timeout
 *   classification, that the SDK itself makes exactly one upstream call (no hidden retries),
 *   and that the fake key never appears in server logs.
 * - The managed preview on port 3000 is never touched.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import http from 'node:http';

const MOCK_PORT = 3998;
const TEST_SERVER_PORT = 3999;
const FAKE_KEY = 'fake-key-for-scenario-tests-not-a-real-secret';

// ---------- Mock Gemini server ----------
type Behavior = 'ok' | '429' | '503' | 'empty' | 'garbage' | 'slow';
let queue: Behavior[] = [];
let hits = 0;

const okBody = JSON.stringify({
  candidates: [
    {
      content: {
        parts: [
          {
            text:
              '• Mock strategic counsel grounded in the record.\n' +
              '• Verify requirements on the official portal.\n' +
              '• Prepare documents before the deadline.',
          },
        ],
        role: 'model',
      },
      finishReason: 'STOP',
      index: 0,
    },
  ],
  usageMetadata: { promptTokenCount: 120, candidatesTokenCount: 60, totalTokenCount: 180 },
  modelVersion: 'gemini-2.5-flash',
});

const mock = http.createServer((req, res) => {
  hits++;
  const behavior = queue.shift() || 'ok';
  if (behavior === '429') {
    res.writeHead(429, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 429, message: 'Resource has been exhausted (e.g. check quota).' } }));
    return;
  }
  if (behavior === '503') {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 503, message: 'The model is overloaded.' } }));
    return;
  }
  if (behavior === 'empty') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ candidates: [] }));
    return;
  }
  if (behavior === 'garbage') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('<<< not json at all {{{');
    return;
  }
  if (behavior === 'slow') {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(okBody);
    }, 13500); // longer than the 12s server-side timeout
    return;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(okBody);
});

// ---------- Assertions ----------
let failures = 0;
let checks = 0;
const assert = (cond: boolean, label: string) => {
  checks++;
  if (cond) console.log(`  PASS: ${label}`);
  else {
    failures++;
    console.log(`  FAIL: ${label}`);
  }
};
const section = (name: string) => console.log(`\n--- ${name} ---`);

// ---------- Test server child ----------
let child: ChildProcess | null = null;
let childOutput = '';

const validBody = () =>
  JSON.stringify({
    question: 'How should I structure my application for this award?',
    studentProfile: {
      nationality: 'Nigeria',
      residenceCountry: 'Nigeria',
      academicLevel: "Master's",
      gpa: 3.85,
      intendedMajor: 'Public Policy',
      targetDestinationCountry: 'United Kingdom',
      hasFinancialNeed: true,
    },
    scholarship: {
      title: 'Chevening Scholarships',
      provider: 'UK FCDO',
      destinationCountries: ['United Kingdom'],
      academicLevels: ["Master's"],
      fundingType: '100% Fully Funded',
      tuitionCoverage: '100% Full Tuition',
      stipendAndOtherBenefits: 'Full stipend',
      academicRequirements: ['Two years work experience'],
      requiredDocuments: ['Transcripts', 'References', 'Essays'],
      deadline: 'November 5',
      officialProgramUrl: 'https://www.chevening.org/',
    },
  });

async function ask(body: string): Promise<{ status: number; body: any }> {
  const res = await fetch(`http://127.0.0.1:${TEST_SERVER_PORT}/api/advisor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
}

async function runScenario(name: Behavior, expect: (r: { status: number; body: any }, mockHits: number) => void) {
  queue.push(name);
  hits = 0;
  const started = Date.now();
  const r = await ask(validBody());
  expect(r, hits);
  console.log(`  (scenario "${name}" took ${Date.now() - started}ms, upstream mock calls: ${hits})`);
}

try {
  // Start mock Gemini
  await new Promise<void>((resolve) => mock.listen(MOCK_PORT, '127.0.0.1', resolve));

  // Start throwaway server.ts instance (production mode => serves dist, no Vite middleware)
  child = spawn('./node_modules/.bin/tsx', ['server.ts'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: String(TEST_SERVER_PORT),
      NODE_ENV: 'production',
      GEMINI_API_KEY: FAKE_KEY,
      GEMINI_BASE_URL: `http://127.0.0.1:${MOCK_PORT}`,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout?.on('data', (d) => (childOutput += String(d)));
  child.stderr?.on('data', (d) => (childOutput += String(d)));

  // Wait for readiness
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${TEST_SERVER_PORT}/api/status`);
      if (r.ok) {
        ready = true;
        break;
      }
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  if (!ready) throw new Error('Test server did not become ready');
  console.log('Test server ready on :' + TEST_SERVER_PORT);

  // Status endpoint with fake key present
  section('0. /api/advisor/status with key present');
  const st = await (await fetch(`http://127.0.0.1:${TEST_SERVER_PORT}/api/advisor/status`)).json();
  assert(st.hasApiKey === true && st.mode === 'live', 'status reports live mode when key set');
  assert(st.setupHint === undefined, 'no setupHint when key is set');

  // 1. Success
  section('1. Successful live response');
  await runScenario('ok', (r, h) => {
    assert(r.status === 200 && r.body.success === true, 'HTTP 200, success=true');
    assert(typeof r.body.advice === 'string' && r.body.advice.includes('Mock strategic counsel'), 'advice text returned');
    assert(Array.isArray(r.body.keyActionItems) && r.body.keyActionItems.length > 0, 'key action items extracted');
    assert(r.body.model === 'gemini-2.5-flash', 'model name in payload');
    assert(h === 1, `exactly 1 upstream call, no SDK retry (got ${h})`);
  });

  // 2. Quota exhaustion
  section('2. HTTP 429 quota exhaustion');
  await runScenario('429', (r, h) => {
    assert(r.status === 429 && r.body.error === 'QUOTA_EXHAUSTED', 'maps to 429 QUOTA_EXHAUSTED');
    assert(r.body.demoAvailable === true, 'demo fallback flagged available');
    assert(h === 1, `SDK did not retry the 429 (got ${h} upstream calls)`);
  });

  // 3. Service unavailable
  section('3. HTTP 503 overloaded');
  await runScenario('503', (r, h) => {
    assert(r.status === 503 && r.body.error === 'SERVICE_UNAVAILABLE', 'maps to 503 SERVICE_UNAVAILABLE');
    assert(r.body.demoAvailable === true, 'demo fallback flagged available');
    assert(h === 1, `SDK did not retry the 503 (got ${h} upstream calls)`);
  });

  // 4. Empty / invalid success payloads
  section('4. Invalid responses (empty candidates, garbage body)');
  await runScenario('empty', (r, h) => {
    assert(r.status >= 500 && r.body.success === false, `empty candidates -> non-2xx error (HTTP ${r.status}, ${r.body.error})`);
    assert(r.body.demoAvailable === true, 'demo fallback flagged available');
    assert(h === 1, `single upstream call (got ${h})`);
  });
  await runScenario('garbage', (r, h) => {
    assert(r.status >= 500 && r.body.success === false, `garbage body -> non-2xx error (HTTP ${r.status}, ${r.body.error})`);
    assert(r.body.demoAvailable === true, 'demo fallback flagged available');
    assert(h === 1, `single upstream call (got ${h})`);
  });

  // 5. Timeout (server-side 12s abort)
  section('5. Upstream timeout (>12s) — takes ~12s');
  await runScenario('slow', (r, h) => {
    assert(r.status === 503 && r.body.error === 'SERVICE_UNAVAILABLE', `timeout -> 503 SERVICE_UNAVAILABLE (HTTP ${r.status}, ${r.body.error})`);
    assert(/timed out/i.test(r.body.message || ''), 'message mentions timeout');
    assert(r.body.demoAvailable === true, 'demo fallback flagged available');
    assert(h === 1, `single upstream call (got ${h})`);
  });

  // 6. Secret hygiene: fake key never in server logs
  section('6. Secret hygiene');
  assert(!childOutput.includes(FAKE_KEY), 'fake API key never appears in server logs');
} catch (err: any) {
  failures++;
  console.log(`  FAIL: harness error: ${err.message}`);
} finally {
  child?.kill('SIGTERM');
  await new Promise<void>((resolve) => mock.close(() => resolve()));
}

console.log(`\n=== ${checks - failures}/${checks} checks passed, ${failures} failed ===`);
process.exit(failures > 0 ? 1 : 0);
