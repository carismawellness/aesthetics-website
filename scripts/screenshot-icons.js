const puppeteer = require('C:/Users/Precision/AppData/Roaming/npm/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 3 });
  await page.goto('http://localhost:3000/membership', { waitUntil: 'networkidle2' });

  // Get bounding rects of all three icon SVGs (they're in the "how it works" section)
  const rects = await page.$$eval('.grid.gap-10.md\\:grid-cols-3 > div > div:first-child svg', svgs =>
    svgs.map(svg => {
      const r = svg.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    })
  );

  const names = ['mem-icon-contribute', 'mem-icon-save', 'mem-icon-spend'];
  const outDir = path.join(__dirname, '../public/assets/treatments');

  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const dpr = 3;
    await page.screenshot({
      path: path.join(outDir, `${names[i]}.png`),
      clip: {
        x: r.x - 6,
        y: r.y - 6,
        width: r.width + 12,
        height: r.height + 12,
      },
    });
    console.log(`Saved ${names[i]}.png (${Math.round(r.width)}x${Math.round(r.height)})`);
  }

  await browser.close();
  console.log('Done.');
})();
