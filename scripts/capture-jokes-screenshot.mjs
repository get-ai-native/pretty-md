import { chromium } from 'playwright';

const INPUT = 'file:///tmp/jokes-preview.html';
const OUTPUT = 'docs/screenshot-jokes.png';

// A "zoomed" README-friendly crop: wide, readable text, and only the top part.
const VIEWPORT = { width: 1800, height: 1000 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });

await page.goto(INPUT, { waitUntil: 'load' });

// Make the rendered page read more like a README screenshot:
// - increase readability (zoom + font size)
// - widen content
// - remove card shadow and gray surround
await page.addStyleTag({
  content: `
    body { background: #fff !important; }
    #content { max-width: 1400px !important; padding: 28px 36px 48px !important; box-shadow: none !important; }
    html { zoom: 1.20; }
    body { font-size: 16px !important; }
    h1 { margin-top: 0 !important; }
  `,
});

await page.waitForTimeout(200);

// Crop to the viewport (no full page) so it looks "zoomed" in the README.
await page.screenshot({
  path: OUTPUT,
  clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
});

await browser.close();
console.log(`saved ${OUTPUT}`);
