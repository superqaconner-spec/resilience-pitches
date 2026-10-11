import { readFileSync } from 'node:fs';
import { products } from './content.mjs';
const pages = ['index.html', ...products.map(p => `${p.slug}/index.html`)];
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  if (!html.startsWith('<!doctype html>') || !html.includes('name="robots" content="noindex,nofollow"')) throw new Error(`Invalid shell: ${file}`);
  if (!html.includes('id="main"') || !html.includes('자료 기준과 한계') && file !== 'index.html') throw new Error(`Missing content: ${file}`);
  if (/\[₩?__\]/.test(html)) throw new Error(`Unfilled placeholder: ${file}`);
  console.log(`${file}: ${html.length} bytes`);
}
