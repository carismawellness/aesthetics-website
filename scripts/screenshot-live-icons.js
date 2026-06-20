const puppeteer = require('C:/Users/Precision/AppData/Roaming/npm/node_modules/puppeteer');
const path = require('path');

const outDir = path.join(__dirname, '../public/assets/treatments');
const DPR = 3;

// SVG bounding rects found on carismaaesthetics.com/membership (CSS pixels, before DPR)
const ICONS = [
  { name: 'mem-icon-contribute', x: 385, y: 1264, w: 79, h: 69 },
  { name: 'mem-icon-save',       x: 742, y: 1270, w: 87, h: 69 },
  { name: 'mem-icon-spend',      x: 1111, y: 1270, w: 79, h: 69 },
];
const PAD = 14; // padding around the icon

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 3000, deviceScaleFactor: DPR });

  console.log('Loading carismaaesthetics.com/membership …');
  await page.goto('https://www.carismaaesthetics.com/membership', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  for (const icon of ICONS) {
    await page.screenshot({
      path: path.join(outDir, `${icon.name}.png`),
      clip: {
        x: icon.x - PAD,
        y: icon.y - PAD,
        width:  icon.w + PAD * 2,
        height: icon.h + PAD * 2,
      },
    });
    console.log(`Saved ${icon.name}.png`);
  }

  await browser.close();
  console.log('Done.');
})();
