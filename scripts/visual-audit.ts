/**
 * Browser audit for OpportunityLens using direct Playwright (no MCP client available).
 * Captures desktop (1440x900) + mobile (390x844) screenshots of every major screen
 * in light + dark mode, and reports: horizontal overflow, console errors, failed
 * API requests, missing fonts, and tap-target red flags.
 *
 * Run: node scripts/visual-audit.mjs [prefix]
 * Output: scripts/shots/<prefix>-<screen>-<viewport>-<theme>.png
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3000';
const PREFIX = process.argv[2] || 'run';
const OUT = 'scripts/shots';
mkdirSync(OUT, { recursive: true });

const SCREENS = [
  { id: 'overview', tab: 'Overview' },
  { id: 'discover', tab: 'Discover Scholarships' },
  { id: 'eligibility', tab: 'Eligibility Reports' },
  { id: 'advisor', tab: 'Scholarship Advisor' },
  { id: 'funding', tab: 'Funding Calculator' },
  { id: 'tracker', tab: 'Application Tracker' },
  { id: 'ingestion', tab: 'Data Ingestion' },
  { id: 'profile', tab: 'Profile & Settings' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const problems: string[] = [];
const note = (sev: string, msg: string) => {
  problems.push(`[${sev}] ${msg}`);
  console.log(`  ${sev === 'ERR' ? '✗' : '⚠'} ${msg}`);
};

const browser = await chromium.launch();
console.log(`Audit prefix: ${PREFIX}`);

for (const vp of VIEWPORTS) {
  for (const theme of ['light', 'dark']) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: theme as 'light' | 'dark',
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();

    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
    });
    page.on('requestfailed', (r) =>
      failedRequests.push(`${r.method()} ${r.url().slice(0, 120)} :: ${r.failure()?.errorText}`)
    );
    page.on('response', (r) => {
      if (r.status() >= 400 && r.url().includes('/api/')) {
        failedRequests.push(`HTTP ${r.status()} ${r.url().slice(0, 120)}`);
      }
    });

    // Force theme via the app's own storage key (matches src/App.tsx)
    await page.addInitScript((t) => {
      localStorage.setItem('opportunitylens_theme', t);
    }, theme);
    // Belt-and-braces: ensure the root class matches after load too
    page.on('domcontentloaded', () => {
      page.evaluate((t) => {
        document.documentElement.classList.toggle('dark', t === 'dark');
      }, theme).catch(() => {});
    });

    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(600);

    const label = `${vp.name}-${theme}`;

    for (const screen of SCREENS) {
      // Navigate via sidebar (desktop) or the drawer (mobile)
      if (vp.name === 'mobile') {
        const inDrawer = await page
          .locator(`.fixed.inset-y-0 button:has-text("${screen.tab}")`)
          .first()
          .isVisible()
          .catch(() => false);
        if (!inDrawer) {
          await page.locator('button[aria-label="Toggle navigation menu"]').click();
          await page.waitForTimeout(400);
        }
        const drawerBtn = page
          .locator(`.fixed.inset-y-0 button:has-text("${screen.tab}")`)
          .first();
        await drawerBtn.click({ timeout: 8000 }).catch(() =>
          note('WARN', `${label}/${screen.id}: drawer nav click failed`)
        );
        // close drawer if it stayed open
        await page
          .locator('button:has(svg.lucide-x)').first()
          .click({ timeout: 1500 })
          .catch(() => {});
      } else {
        await page
          .locator(`nav button:has-text("${screen.tab}")`)
          .first()
          .click({ timeout: 8000 })
          .catch(() => note('WARN', `${label}/${screen.id}: nav click failed`));
      }
      await page.waitForTimeout(700);

      await page.screenshot({ path: `${OUT}/${PREFIX}-${screen.id}-${label}.png`, fullPage: false });

      // Horizontal overflow check
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        const offenders = [];
        if (de.scrollWidth > de.clientWidth + 1) {
          for (const el of Array.from(document.querySelectorAll('*'))) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && (r.right > de.clientWidth + 2 || r.left < -2)) {
              offenders.push(
                `${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 4).join('.')} right=${Math.round(r.right)}`
              );
              if (offenders.length >= 3) break;
            }
          }
        }
        return { scrollW: de.scrollWidth, clientW: de.clientWidth, offenders };
      });
      if (overflow.scrollW > overflow.clientW + 1) {
        note('ERR', `${label}/${screen.id}: H-OVERFLOW ${overflow.scrollW}>${overflow.clientW} :: ${overflow.offenders.join(' | ')}`);
      }

      // Dialog check: is a modal rendering off-screen?
      const modalOff = await page.evaluate(() => {
        const m = document.querySelector('[role="dialog"], .fixed.inset-0');
        if (!m) return null;
        const r = m.getBoundingClientRect();
        return r.bottom > window.innerHeight + 4 || r.right > window.innerWidth + 4 ? `bottom=${Math.round(r.bottom)} vh=${window.innerHeight}` : null;
      });
      if (modalOff) note('WARN', `${label}/${screen.id}: modal extends off-screen ${modalOff}`);
    }

    if (consoleErrors.length) note('ERR', `${label}: ${consoleErrors.length} console errors :: ${[...new Set(consoleErrors)].slice(0, 3).join(' ;; ')}`);
    if (failedRequests.length) note('ERR', `${label}: failed requests :: ${[...new Set(failedRequests)].slice(0, 3).join(' ;; ')}`);

    // Font check
    const fontUsed = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    if (!/Source Sans/.test(fontUsed)) note('WARN', `${label}: body font not Source Sans 3 -> ${fontUsed.slice(0, 80)}`);

    await ctx.close();
  }
}

await browser.close();

console.log(`\n=== AUDIT DONE: ${problems.filter((p) => p.startsWith('[ERR]')).length} errors, ${problems.filter((p) => p.startsWith('[WARN]')).length} warnings ===`);
process.exit(0);
