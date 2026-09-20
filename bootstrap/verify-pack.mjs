#!/usr/bin/env node
// Sanity-check the hand-off pack (or the repo after T0.1): docs present, manifest ↔ files, quality summary.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ok = (m) => console.log('✔', m);
const bad = (m) => { console.error('✘', m); failed = true; };
let failed = false;

for (const f of ['MASTER_PROMPT.md', 'AGENTS.md', 'DECISIONS.md', 'OWNER_INPUTS.md', 'docs/01_PRD.md', 'docs/02_AGENT_DEVELOPMENT_PLAN.md',
  'docs/03_DESIGN_SYSTEM.md', 'content/brand-master-plan.md', 'content/website-content-v1.md',
  'docs/agents/00-orchestrator.md', 'docs/agents/10-track-a-experience.md', 'docs/agents/20-track-b-commerce.md',
  'docs/agents/30-track-c-ops.md', 'docs/agents/90-reviewer.md']) {
  existsSync(join(root, f)) ? ok(f) : bad(`missing ${f}`);
}

const placed = existsSync(join(root, 'public/assets/asset-manifest.json'));
const assetRoot = placed ? join(root, 'public/assets') : join(root, 'assets');
const manifestPath = join(assetRoot, 'asset-manifest.json');
if (!existsSync(manifestPath)) { bad('asset-manifest.json not found'); process.exit(1); }
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const counts = {};
for (const a of manifest.assets) {
  const p = join(assetRoot, a.file);
  if (!existsSync(p)) { bad(`manifest entry ${a.id}: missing file ${a.file}`); continue; }
  if (!a.alt?.en || !a.alt?.bn) bad(`manifest entry ${a.id}: alt text (en+bn) required`);
  counts[a.quality] = (counts[a.quality] ?? 0) + 1;
  if (statSync(p).size === 0) bad(`empty file ${a.file}`);
}
ok(`manifest: ${manifest.assets.length} assets (${placed ? 'public/assets' : 'assets/'})`);
for (const [q, n] of Object.entries(counts)) console.log(`   ${q}: ${n}`);
if (counts['placeholder-low-res']) console.warn(`⚠ ${counts['placeholder-low-res']} low-res placeholder(s) must be replaced before launch`);
process.exit(failed ? 1 : 0);
