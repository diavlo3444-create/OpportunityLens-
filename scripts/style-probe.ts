/**
 * Style probe: verifies the redesign's computed styles in a real browser.
 * Run: bun scripts/style-probe.ts
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const results: string[] = [];
let failures = 0;
const check = (label: string, pass: boolean, detail: string) => {
  results.push(`${pass ? 'PASS' : 'FAIL'} · ${label} → ${detail}`);
  if (!pass) failures++;
};

const browser = await chromium.launch();

for (const theme of ['light', 'dark'] as const) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: theme,
  });
  const page = await ctx.newPage();
  await page.addInitScript((t) => {
    localStorage.setItem('opportunitylens_theme', t as string);
  }, theme);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const probe = await page.evaluate(() => {
    const cs = (el: Element | null) => (el ? getComputedStyle(el) : null);
    const activeNav = document.querySelector('aside nav button[aria-current="page"]');
    const h1 = document.querySelector('h1');
    const eyebrow = document.querySelector('h1')?.previousElementSibling ?? document.querySelector('[class*="uppercase"][class*="brass"]');
    const body = document.body;
    const card = document.querySelector('main [class*="rounded-xl"]');
    return {
      bodyFont: cs(body)!.fontFamily,
      h1Font: h1 ? cs(h1).fontFamily : 'NO H1',
      h1Weight: h1 ? cs(h1).fontWeight : '-',
      activeNavBg: activeNav ? cs(activeNav)!.backgroundColor : 'NO ACTIVE NAV',
      activeNavColor: activeNav ? cs(activeNav)!.color : '-',
      eyebrowColor: eyebrow ? cs(eyebrow)!.color : 'no eyebrow',
      cardRadius: card ? cs(card)!.borderRadius : 'no card',
      cardShadow: card ? cs(card)!.boxShadow.slice(0, 40) : '-',
      rootDark: document.documentElement.classList.contains('dark'),
      blueLeft: Array.from(document.querySelectorAll('main *')).filter((el) => {
        const s = getComputedStyle(el);
        return [s.backgroundColor, s.color, s.borderColor].some((c) =>
          c.includes('37, 99, 235') || c.includes('59, 130, 246') || c.includes('29, 78, 216')
        );
      }).length,
    };
  });

  const isDark = theme === 'dark';
  check(`${theme}: root .dark class`, probe.rootDark === isDark, `dark=${probe.rootDark}`);
  check(`${theme}: body font`, probe.bodyFont.includes('Source Sans 3'), probe.bodyFont.slice(0, 45));
  check(`${theme}: h1 display font`, probe.h1Font.includes('Lexend'), probe.h1Font.slice(0, 45));
  check(`${theme}: active nav pill`, probe.activeNavBg !== 'NO ACTIVE NAV', probe.activeNavBg + ' / text ' + probe.activeNavColor);
  if (!isDark) {
    check('light: active nav is ink', probe.activeNavBg === 'rgb(28, 25, 23)', probe.activeNavBg);
    check('light: eyebrow brass', probe.eyebrowColor === 'rgb(180, 83, 9)', probe.eyebrowColor);
  } else {
    check('dark: active nav inverted to paper', probe.activeNavBg === 'rgb(250, 250, 249)', probe.activeNavBg);
    check('dark: eyebrow brass-lt', probe.eyebrowColor === 'rgb(245, 158, 11)', probe.eyebrowColor);
  }
  check(`${theme}: no brand-blue elements on landing`, probe.blueLeft === 0, `${probe.blueLeft} blue-styled elements`);
  check(`${theme}: card radius ≤ 16px`, parseFloat(probe.cardRadius) <= 16, probe.cardRadius);

  // Focus ring probe: tab to first interactive element, read outline color
  await page.keyboard.press('Tab');
  // .transition-colors animates outline-color over 150ms — read after it settles.
  await page.waitForTimeout(300);
  const focusInfo = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const s = getComputedStyle(el);
    return {
      tag: el.tagName,
      cls: String(el.className).slice(0, 90),
      fvv: el.matches(':focus-visible'),
      outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`,
      color: s.color,
    };
  });
  const expected = isDark ? 'rgb(245, 158, 11)' : 'rgb(180, 83, 9)';
  const focusColor = focusInfo.outline.split(' ').slice(2).join(' ');
  check(
    `${theme}: focus outline brass`,
    focusColor === expected,
    `el=<${focusInfo.tag.toLowerCase()} class="${focusInfo.cls}"> fv=${focusInfo.fvv} outline=[${focusInfo.outline}]`
  );

  await ctx.close();
}

await browser.close();
console.log(results.join('\n'));
console.log(`\n${failures === 0 ? 'ALL STYLE PROBES PASSED' : `${failures} PROBES FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
