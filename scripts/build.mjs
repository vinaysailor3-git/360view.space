import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const output = path.join(root, 'dist');
const excluded = new Set(['.git', '.wrangler', 'dist', 'node_modules', 'scripts', 'wrangler.jsonc', 'package.json', 'README.md', '.gitignore', '.gitattributes']);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir(root)) {
  if (excluded.has(entry) || entry.startsWith('.')) continue;
  const source = path.join(root, entry);
  const entryStat = await stat(source);
  if (entryStat.isDirectory() || entryStat.isFile()) {
    await cp(source, path.join(output, entry), { recursive: true });
  }
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
process.env.SITE_ROOT = output;
await import(`${path.join(scriptDirectory, 'generate-index.mjs')}?output=${Date.now()}`);
