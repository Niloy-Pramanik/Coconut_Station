import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

function checkPlaceholders() {
  if (process.env.STRICT_LAUNCH !== '1') {
    console.log('Skipping STRICT_LAUNCH checks.');
    return;
  }

  let failed = false;

  // Check site.config.ts for TODO_
  const siteConfigPath = path.join(root, 'src', 'content', 'site.config.ts');
  if (fs.existsSync(siteConfigPath)) {
    const content = fs.readFileSync(siteConfigPath, 'utf-8');
    if (content.includes('TODO_')) {
      console.error('❌ Error: Found TODO_ placeholders in site.config.ts');
      failed = true;
    }
  }

  // Check asset-manifest.json for -PLACEHOLDER
  const manifestPath = path.join(root, 'public', 'assets', 'asset-manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    for (const asset of manifest.assets) {
      if (asset.id.includes('-PLACEHOLDER') || asset.file.includes('-PLACEHOLDER') || asset.quality === 'placeholder-low-res') {
        console.error(`❌ Error: Found placeholder asset in manifest: ${asset.id}`);
        failed = true;
      }
    }
  }

  // Check env for SEED_DEMO_PRICES=1
  if (process.env.SEED_DEMO_PRICES === '1') {
    console.error('❌ Error: SEED_DEMO_PRICES is set to 1 in a strict launch build.');
    failed = true;
  }

  if (failed) {
    console.error('\nLaunch checks failed due to STRICT_LAUNCH=1.');
    console.error('Please resolve all placeholders and demo data before launching.');
    process.exit(1);
  }

  console.log('✔ All launch placeholder checks passed.');
}

checkPlaceholders();
