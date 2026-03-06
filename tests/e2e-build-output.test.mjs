import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const distDir = join(root, 'dist');

// Build must exist
assert(existsSync(distDir), 'dist/ directory must exist - run `npm run build` first');

const staticIndexHtmlPath = join(distDir, 'index.html');
const workerIndexModulePath = join(distDir, '_worker.js', 'pages', 'index.astro.mjs');
const workerPrivacyModulePath = join(distDir, '_worker.js', 'pages', 'privacidade.astro.mjs');

let outputMode = '';
let pageSource = '';
let privacySource = '';
let headSource = '';

if (existsSync(staticIndexHtmlPath)) {
  outputMode = 'static-html';
  pageSource = readFileSync(staticIndexHtmlPath, 'utf8');
  headSource = pageSource;

  const staticPrivacyHtmlPath = join(distDir, 'privacidade', 'index.html');
  assert(existsSync(staticPrivacyHtmlPath), 'dist/privacidade/index.html must exist');
  privacySource = readFileSync(staticPrivacyHtmlPath, 'utf8');
} else {
  outputMode = 'cloudflare-ssr';
  assert(
    existsSync(workerIndexModulePath),
    'Build must include dist/index.html or dist/_worker.js/pages/index.astro.mjs'
  );
  assert(
    existsSync(workerPrivacyModulePath),
    'Cloudflare SSR build must include dist/_worker.js/pages/privacidade.astro.mjs'
  );

  pageSource = readFileSync(workerIndexModulePath, 'utf8');
  privacySource = readFileSync(workerPrivacyModulePath, 'utf8');

  const workerChunksDir = join(distDir, '_worker.js', 'chunks');
  assert(existsSync(workerChunksDir), 'Cloudflare SSR build must include dist/_worker.js/chunks');

  const baseLayoutChunk = readdirSync(workerChunksDir).find((file) => /^BaseLayout_.*\.mjs$/.test(file));
  assert(baseLayoutChunk, 'Cloudflare SSR build must include BaseLayout chunk');
  headSource = readFileSync(join(workerChunksDir, baseLayoutChunk), 'utf8');
}

// ============================================================
// 1. Document language and shell metadata
// ============================================================
if (outputMode === 'static-html') {
  assert(
    pageSource.includes('<!doctype html>') || pageSource.includes('<!DOCTYPE html>'),
    'Static HTML build must include DOCTYPE'
  );
}
assert(headSource.includes('lang="pt-BR"'), 'Build output must declare lang="pt-BR"');

// ============================================================
// 2. Head meta tags
// ============================================================
assert(headSource.includes('<meta charset="UTF-8"') || headSource.includes('charset="utf-8"'), 'Must include charset meta');
assert(headSource.includes('name="viewport"'), 'Must include viewport meta');
assert(headSource.includes('name="description"'), 'Must include description meta');

// ============================================================
// 3. SEO: OG and Twitter
// ============================================================
assert(headSource.includes('property="og:type"'), 'Build output must include og:type');
assert(headSource.includes('property="og:image"'), 'Build output must include og:image');
assert(headSource.includes('property="twitter:card"'), 'Build output must include twitter:card');

// ============================================================
// 4. Title tag presence
// ============================================================
assert(headSource.includes('<title>') && headSource.includes('</title>'), 'Build output must include title tags');

// ============================================================
// 5. Key content rendered in page output
// ============================================================
assert(pageSource.includes('Pare de Automatizar o Caos'), 'Hero headline must be in build output');
assert(pageSource.includes('Engenharia Operacional'), 'Hero tagline must be in build output');
assert(pageSource.includes('voo cego'), 'Problem section headline must be in build output');
assert(pageSource.includes('Processos Manuais'), 'Problem card 1 must be in build output');
assert(pageSource.includes('Escala Linear'), 'Problem card 2 must be in build output');
assert(pageSource.includes('MEM_DEP'), 'Problem card 3 badge code must be in build output');
assert(pageSource.includes('metodo-aptus'), 'Solution section anchor must be in build output');
assert(pageSource.includes('Auditoria'), 'Solution step 1 must be in build output');
assert(pageSource.includes('Arquitetura'), 'Solution step 2 must be in build output');
assert(pageSource.includes('Deploy'), 'Solution step 3 must be in build output');
assert(pageSource.includes('Agendar Auditoria'), 'CTA text must be in build output');

// ============================================================
// 6. Semantic structure in output
// ============================================================
const combinedPageAndLayout = `${headSource}\n${pageSource}`;
assert(/<header[\s>]/.test(combinedPageAndLayout), 'Build output must include <header>');
assert(/<main[\s>]/.test(combinedPageAndLayout), 'Build output must include <main>');
assert(/<footer[\s>]/.test(combinedPageAndLayout), 'Build output must include <footer>');
assert(/<section[\s>]/.test(pageSource), 'Build output must include <section> elements');
assert(/<dialog[\s>]/.test(pageSource), 'Build output must include <dialog> element');
assert(/<h1[\s>]/.test(pageSource), 'Build output must include h1');

// Only one h1 on the landing page
const h1Count = (pageSource.match(/<h1[\s>]/g) || []).length;
assert(h1Count === 1, `Build output must have exactly 1 h1 for landing page, found ${h1Count}`);

// ============================================================
// 7. Preloaded fonts
// ============================================================
assert(headSource.includes('rel="preload"'), 'Build output must preload fonts');

// ============================================================
// 8. JSON-LD structured data
// ============================================================
assert(headSource.includes('application/ld+json'), 'Build output must include JSON-LD script');

// ============================================================
// 9. Key IDs for navigation anchors
// ============================================================
assert(pageSource.includes('id="metodo-aptus"'), 'Build must include #metodo-aptus anchor');
assert(pageSource.includes('id="auditoria"'), 'Build must include #auditoria anchor');
assert(pageSource.includes('id="diagnostic-modal"'), 'Build must include #diagnostic-modal');

// ============================================================
// 10. Privacy page build
// ============================================================
assert(privacySource.includes('Dados Coletados'), 'Privacy build must include LGPD content');
assert(privacySource.includes('LGPD'), 'Privacy build must reference LGPD');

// ============================================================
// 11. Static assets
// ============================================================
assert(existsSync(join(root, 'public', 'og-image.png')), 'public/og-image.png must exist');
assert(existsSync(join(root, 'public', 'favicon-96x96.png')), 'public/favicon-96x96.png must exist');
assert(existsSync(join(root, 'public', 'favicon.ico')), 'public/favicon.ico must exist');
assert(existsSync(join(root, 'public', 'site.webmanifest')), 'public/site.webmanifest must exist');
assert(existsSync(join(distDir, 'og-image.png')), 'dist/og-image.png must exist');
assert(existsSync(join(distDir, 'site.webmanifest')), 'dist/site.webmanifest must exist');

console.log('E2E build output checks passed.');
