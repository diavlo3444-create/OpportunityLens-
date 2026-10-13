/**
 * Scenario tests for the advisor client (src/utils/advisorService.ts).
 * Run: bun scripts/advisor-client-scenarios.ts
 *
 * Stubs localStorage + fetch before loading the module under test, then verifies:
 * demo mode makes zero API calls, caching rules, retry bounds, timeout, and health parsing.
 */

const store = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
  setItem: (k: string, v: string) => {
    store.set(k, String(v));
  },
  removeItem: (k: string) => {
    store.delete(k);
  },
};

let fetchCalls = 0;
type FetchImpl = (url: string, init: any) => Promise<any>;
let fetchImpl: FetchImpl = async () => {
  throw new Error('fetchImpl not set');
};
(globalThis as any).fetch = (url: any, init: any) => {
  fetchCalls++;
  return fetchImpl(String(url), init);
};

const okJson = (body: any) => ({ ok: true, status: 200, json: async () => body });
const errJson = (status: number, body: any) => ({ ok: false, status, json: async () => body });

const svc = await import('../src/utils/advisorService.ts');
const { GLOBAL_SCHOLARSHIPS } = await import('../src/data/scholarships.ts');
const { INITIAL_STUDENT_PROFILE } = await import('../src/utils/storage.ts');

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

const sch: any = { ...GLOBAL_SCHOLARSHIPS[0] };
const profile: any = { ...INITIAL_STUDENT_PROFILE };

svc.clearAdvisorCache();

// 1. Demo mode makes ZERO API calls
section('1. Demo mode (forceDemoMode) — zero AI API calls');
{
  fetchCalls = 0;
  const res = await svc.requestScholarshipAdvice('What is my strategy for this award?', sch, profile, true);
  assert(res.success === true, 'demo request succeeds');
  assert(res.response?.isDemo === true, 'response labeled isDemo');
  assert(/Demo Archive/i.test(res.response?.model || ''), 'model labeled as demo archive');
  assert(fetchCalls === 0, `zero fetch calls (got ${fetchCalls})`);
}

// 2. Live success + local cache hit on repeat
section('2. Live success then cached repeat');
{
  fetchCalls = 0;
  fetchImpl = async () =>
    okJson({
      advice: '• Live advice line one\n• Live advice line two',
      model: 'gemini-2.5-flash',
      wordCount: 8,
      keyActionItems: ['do the thing'],
    });
  const q1 = 'How do I maximize my chances uniquely one?';
  const r1 = await svc.requestScholarshipAdvice(q1, sch, profile, false);
  assert(r1.success && r1.response?.isDemo === false, 'live response returned, isDemo=false');
  assert(fetchCalls === 1, `one API call made (got ${fetchCalls})`);

  const r2 = await svc.requestScholarshipAdvice(q1, sch, profile, false);
  assert(r2.success && r2.response?.cached === true, 'second identical ask served from cache');
  assert(fetchCalls === 1, `no extra API call on cache hit (got ${fetchCalls})`);
}

// 3. Cache invalidation: scholarship data version change
section('3. Cache key includes scholarship data version');
{
  fetchCalls = 0;
  const q = 'How do I maximize my chances uniquely one?'; // same question as cached above
  const schChanged: any = { ...sch, updatedAt: '2030-01-01T00:00:00.000Z' };
  await svc.requestScholarshipAdvice(q, schChanged, profile, false);
  assert(fetchCalls === 1, `changed scholarship -> cache miss, new API call (got ${fetchCalls})`);
}

// 4. Cache key includes relevant profile info
section('4. Cache key includes profile (GPA change)');
{
  fetchCalls = 0;
  const q = 'How do I maximize my chances uniquely one?';
  const profileChanged: any = { ...profile, gpa: 2.5 };
  await svc.requestScholarshipAdvice(q, sch, profileChanged, false);
  assert(fetchCalls === 1, `changed profile -> cache miss, new API call (got ${fetchCalls})`);
}

// 5. 429 quota — immediate failure, ONE call only, never cached
section('5. HTTP 429 quota exhaustion');
{
  fetchCalls = 0;
  fetchImpl = async () => errJson(429, { success: false, error: 'QUOTA_EXHAUSTED', message: 'quota' });
  const q = 'What documents do I need for quota test?';
  const r = await svc.requestScholarshipAdvice(q, sch, profile, false);
  assert(r.success === false && r.errorCode === 'QUOTA_EXHAUSTED', 'errorCode QUOTA_EXHAUSTED');
  assert(r.canUseDemoFallback === true, 'demo fallback offered');
  assert(fetchCalls === 1, `no retry on 429 — exactly 1 call (got ${fetchCalls})`);
  const key = svc.buildAdvisorCacheKey(q, sch, profile);
  assert(svc.getCachedAdvice(key) === null, 'error response NOT cached');
}

// 6. 503 CONFIG_MISSING — immediate failure, ONE call only
section('6. HTTP 503 CONFIG_MISSING (missing server key)');
{
  fetchCalls = 0;
  fetchImpl = async () => errJson(503, { success: false, error: 'CONFIG_MISSING', message: 'no key' });
  const r = await svc.requestScholarshipAdvice('Why is my config missing test question?', sch, profile, false);
  assert(r.success === false && r.errorCode === 'CONFIG_MISSING', 'errorCode CONFIG_MISSING');
  assert(fetchCalls === 1, `no retry on CONFIG_MISSING — exactly 1 call (got ${fetchCalls})`);
}

// 7. 503 SERVICE_UNAVAILABLE — exactly ONE brief retry (2 calls total)
section('7. HTTP 503 SERVICE_UNAVAILABLE — single brief retry');
{
  fetchCalls = 0;
  fetchImpl = async () => errJson(503, { success: false, error: 'SERVICE_UNAVAILABLE', message: 'overloaded' });
  const r = await svc.requestScholarshipAdvice('Service unavailable retry test question?', sch, profile, false);
  assert(r.success === false && r.errorCode === 'SERVICE_UNAVAILABLE', 'errorCode SERVICE_UNAVAILABLE');
  assert(fetchCalls === 2, `exactly 2 calls (1 retry) (got ${fetchCalls})`);
}

// 8. Network failure — exactly ONE brief retry
section('8. Network error — single brief retry');
{
  fetchCalls = 0;
  fetchImpl = async () => {
    throw new Error('connect ECONNREFUSED 127.0.0.1:3000');
  };
  const r = await svc.requestScholarshipAdvice('Network failure retry test question?', sch, profile, false);
  assert(r.success === false && r.errorCode === 'NETWORK_ERROR', 'errorCode NETWORK_ERROR');
  assert(fetchCalls === 2, `exactly 2 calls (1 retry) (got ${fetchCalls})`);
}

// 9. Timeout — hangs until client aborts at 14s, no infinite retry (~14s runtime)
section('9. Timeout (14s abort, no retry) — takes ~14s');
{
  fetchCalls = 0;
  fetchImpl = (_url, init) =>
    new Promise((_resolve, reject) => {
      init.signal.addEventListener('abort', () => {
        const e: any = new Error('The operation was aborted');
        e.name = 'AbortError';
        reject(e);
      });
    });
  const started = Date.now();
  const r = await svc.requestScholarshipAdvice('Timeout scenario test question?', sch, profile, false);
  const elapsed = Date.now() - started;
  assert(r.success === false && r.errorCode === 'TIMEOUT_ERROR', 'errorCode TIMEOUT_ERROR');
  assert(fetchCalls === 1, `no retry on timeout — exactly 1 call (got ${fetchCalls})`);
  assert(elapsed >= 13500 && elapsed < 20000, `aborted around 14s (elapsed ${elapsed}ms)`);
}

// 10. Invalid success body (JSON parse failure) — bounded retry, never cached
section('10. Invalid response body (JSON parse failure)');
{
  fetchCalls = 0;
  fetchImpl = async () => ({
    ok: true,
    status: 200,
    json: async () => {
      throw new SyntaxError('Unexpected token < in JSON');
    },
  });
  const q = 'Invalid response body test question?';
  const r = await svc.requestScholarshipAdvice(q, sch, profile, false);
  assert(r.success === false, 'invalid body treated as failure');
  assert(fetchCalls === 2, `bounded at 2 calls (got ${fetchCalls})`);
  const key = svc.buildAdvisorCacheKey(q, sch, profile);
  assert(svc.getCachedAdvice(key) === null, 'invalid response NOT cached');
}

// 11. Health check parses setupHint; non-OK health handled
section('11. getAdvisorHealth (status payload + failure)');
{
  fetchImpl = async () =>
    okJson({ ok: true, hasApiKey: false, model: 'gemini-2.5-flash', mode: 'demo-recommended', setupHint: 'Add key in Settings' });
  const h1 = await svc.getAdvisorHealth();
  assert(h1.ok === true && h1.hasApiKey === false && h1.isAvailable === false, 'health reports key missing');
  assert(h1.setupHint === 'Add key in Settings', 'setupHint propagated');

  fetchImpl = async () => errJson(500, {});
  const h2 = await svc.getAdvisorHealth();
  assert(h2.ok === false && h2.isAvailable === false, 'non-OK status handled without throw');
}

console.log(`\n=== ${checks - failures}/${checks} checks passed, ${failures} failed ===`);
process.exit(failures > 0 ? 1 : 0);
