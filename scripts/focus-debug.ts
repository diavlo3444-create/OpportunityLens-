/** One-off: why is :focus-visible outline-color not brass? Run: bun scripts/focus-debug.ts */
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.keyboard.press('Tab');

const out = await page.evaluate(() => {
  const el = document.activeElement as HTMLElement;
  const s = getComputedStyle(el);
  const lines: string[] = [];
  lines.push(`el=${el.tagName}.${String(el.className).slice(0, 60)}`);
  lines.push(`outline=${s.outline}`);
  lines.push(`outlineColor=${s.outlineColor} color=${s.color}`);
  lines.push(`--color-brass on el = ${getComputedStyle(el).getPropertyValue('--color-brass')}`);
  lines.push(`:root --color-brass = ${getComputedStyle(document.documentElement).getPropertyValue('--color-brass')}`);
  // find all CSS rules mentioning outline-color or the focus-visible rule
  const found: string[] = [];
  const walk = (rules: CSSRuleList, depth: number) => {
    for (const r of Array.from(rules)) {
      const t = (r as CSSStyleRule).cssText || '';
      if (/outline/i.test(t) && depth < 3 && found.length < 14) {
        found.push(t.slice(0, 220));
      }
      if ('cssRules' in r && (r as CSSGroupingRule).cssRules && depth < 4) {
        walk((r as CSSGroupingRule).cssRules, depth + 1);
      }
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walk(sheet.cssRules, 0);
    } catch {
      /* cross-origin */
    }
  }
  lines.push('--- rules mentioning outline ---');
  lines.push(found.join('\n'));
  return lines.join('\n');
});

console.log(out);
await browser.close();
