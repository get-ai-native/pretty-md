import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 2 });
const page = await context.newPage();
await page.setViewportSize({ width: 900, height: 900 });

await page.goto('file:///tmp/syntax-preview.html');
await page.waitForTimeout(500);
await page.screenshot({ path: 'docs/screenshot-syntax.png', fullPage: true });
console.log('saved docs/screenshot-syntax.png');

await page.goto('file:///tmp/jokes-preview.html');
await page.waitForTimeout(500);
await page.screenshot({ path: 'docs/screenshot-jokes.png', fullPage: true });
console.log('saved docs/screenshot-jokes.png');

await browser.close();
