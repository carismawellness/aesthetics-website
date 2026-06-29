/**
 * extract-dermal-fillers-steps-v3.js
 * Targeted download of the 4 confirmed step images from the "treatment experience" section.
 *
 * From page analysis, the 4 step card images were identified by their alt text:
 * Step 1: alt="Personalised Botox Consultation in Malta"  → 87fc13_3063a68eaa444943a436616231780798~mv2.png
 * Step 2: alt="Structured Botox Plan in Malta"            → 87fc13_3becd923471042d8a6f63ea22f384368~mv2.png
 * Step 3: alt="Malta's best targeted botox treatment"     → 87fc13_20fe9f49594548a5afe2c37a86f0b75c~mv2.png
 * Step 4: alt="Botox results review with a doctor"        → 87fc13_aca3fd09358b417095cd0561d6d65ff2~mv2.png
 *
 * These have comp IDs: mmyvn3qy4, mmyvn3r3, mmyvn3r61, mmyvn3r91
 * We download the originals (strip /v1/crop... transform params)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'treatments');

// The 4 confirmed step images — original CDN URLs (no transform params)
const STEP_IMAGES = [
  {
    step: 1,
    label: 'Personalised Consultation',
    // Original: 87fc13_3063a68eaa444943a436616231780798~mv2.png
    // Displayed with crop: /v1/crop/x_0,y_221,w_667,h_281
    // Get the uncropped original:
    url: 'https://static.wixstatic.com/media/87fc13_3063a68eaa444943a436616231780798~mv2.png',
    filename: 'dermal-fillers-malta-step1.png'
  },
  {
    step: 2,
    label: 'Structured Plan',
    url: 'https://static.wixstatic.com/media/87fc13_3becd923471042d8a6f63ea22f384368~mv2.png',
    filename: 'dermal-fillers-malta-step2.png'
  },
  {
    step: 3,
    label: 'Targeted Treatments',
    url: 'https://static.wixstatic.com/media/87fc13_20fe9f49594548a5afe2c37a86f0b75c~mv2.png',
    filename: 'dermal-fillers-malta-step3.png'
  },
  {
    step: 4,
    label: 'Ongoing Review & Adjustment',
    url: 'https://static.wixstatic.com/media/87fc13_aca3fd09358b417095cd0561d6d65ff2~mv2.png',
    filename: 'dermal-fillers-malta-step4.png'
  }
];

function downloadImage(imageUrl, destPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(imageUrl);
    const file = fs.createWriteStream(destPath);
    const request = https.get(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.carismaaesthetics.com/',
        'Accept': 'image/avif,image/webp,image/png,image/jpeg,*/*'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        return reject(new Error(`HTTP ${response.statusCode} for ${imageUrl}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(destPath);
        resolve({ path: destPath, bytes: stats.size });
      });
      file.on('error', (err) => {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        reject(err);
      });
    });
    request.on('error', (err) => {
      file.close();
      try { fs.unlinkSync(destPath); } catch {}
      reject(err);
    });
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('Created output dir:', OUTPUT_DIR);
  }

  console.log('Downloading 4 treatment experience step images...\n');

  const results = [];
  for (const img of STEP_IMAGES) {
    const destPath = path.join(OUTPUT_DIR, img.filename);
    console.log(`Step ${img.step} — ${img.label}`);
    console.log(`  URL: ${img.url}`);
    console.log(`  Dest: ${destPath}`);

    try {
      const result = await downloadImage(img.url, destPath);
      const sizeKb = (result.bytes / 1024).toFixed(1);
      console.log(`  SUCCESS — ${sizeKb} KB\n`);
      results.push({ step: img.step, filename: img.filename, url: img.url, success: true, kb: sizeKb });
    } catch (err) {
      console.log(`  FAILED — ${err.message}\n`);
      results.push({ step: img.step, filename: img.filename, url: img.url, success: false, error: err.message });
    }
  }

  console.log('=== SUMMARY ===');
  results.forEach(r => {
    const status = r.success ? `OK — ${r.kb} KB` : `FAILED — ${r.error}`;
    console.log(`  Step ${r.step} (${r.filename}): ${status}`);
  });

  const allOk = results.every(r => r.success);
  console.log(`\nAll downloads ${allOk ? 'SUCCEEDED' : 'had failures'}.`);
  return allOk;
}

main().then(ok => process.exit(ok ? 0 : 1)).catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
