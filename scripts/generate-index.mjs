import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.env.SITE_ROOT || process.argv[2] || process.cwd());
const indexPath = path.join(root, 'index.html');
const ignoredDirectories = new Set(['.git', '.github', 'functions', 'node_modules', 'scripts']);

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

function displayName(folderName) {
  return folderName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const entries = await readdir(root);
const sites = [];

for (const entry of entries) {
  if (ignoredDirectories.has(entry) || entry.startsWith('.')) continue;
  const directoryPath = path.join(root, entry);
  const entryStat = await stat(directoryPath);
  if (!entryStat.isDirectory()) continue;

  try {
    await stat(path.join(directoryPath, 'index.html'));
    sites.push(entry);
  } catch {
    // A folder without an index.html is not a deployable site.
  }
}

const cards = sites.sort((first, second) => first.localeCompare(second)).map((site) => {
  const title = escapeHtml(displayName(site));
  const href = encodeURIComponent(site).replace(/%2F/g, '');
  return `      <a href="${href}/"><strong>${title}</strong><span>Open the ${title} virtual tour</span></a>`;
}).join('\n');

const index = await readFile(indexPath, 'utf8');
const start = '<!-- TOUR_CARDS_START -->';
const end = '<!-- TOUR_CARDS_END -->';
const expression = new RegExp(`(${start})[\\s\\S]*?(${end})`);

if (!expression.test(index)) {
  throw new Error('index.html is missing the TOUR_CARDS markers.');
}

await writeFile(indexPath, index.replace(expression, `$1\n${cards}\n      $2`));
console.log(`Generated tour directory with ${sites.length} site(s): ${sites.join(', ')}`);
