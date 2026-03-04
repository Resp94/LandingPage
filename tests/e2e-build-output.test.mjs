import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

const root = process.cwd();
const distDir = join(root, 'dist');

// Build must exist
assert(existsSync(distDir), 'dist/ directory must exist — run `npm run build` first');

const indexHtmlPath = join(distDir, 'index.html');
assert(existsSync(indexHtmlPath), 'dist/index.html must exist');

const html = readFileSync(indexHtmlPath, 'utf8');

// ============================================================
// 1. DOCTYPE and language
// ============================================================
assert(html.includes('<!doctype html>') || html.includes('<!DOCTYPE html>'), 'Must include DOCTYPE');
assert(html.includes('lang="pt-BR"'), 'Must declare lang="pt-BR"');

// ============================================================
// 2. Head: meta tags
// ============================================================
assert(html.includes('<meta charset="UTF-8"') || html.includes('charset="utf-8"'), 'Must include charset meta');
assert(html.includes('name="viewport"'), 'Must include viewport meta');
assert(html.includes('name="description"'), 'Must include description meta');

// ============================================================
// 3. SEO: OG and Twitter
// ============================================================
assert(html.includes('property="og:type"'), 'Built HTML must include og:type');
assert(html.includes('property="og:image"'), 'Built HTML must include og:image');
assert(html.includes('property="twitter:card"'), 'Built HTML must include twitter:card');

// ============================================================
// 4. Title tag presence
// ============================================================
assert(/<title>.*<\/title>/.test(html), 'Must have a non-empty title tag');

// ============================================================
// 5. Key content rendered in HTML
// ============================================================
assert(html.includes('Pare de Automatizar o Caos'), 'Hero headline must be in built HTML');
assert(html.includes('Engenharia Operacional'), 'Hero tagline must be in built HTML');
assert(html.includes('voo cego'), 'Problem section headline must be in built HTML');
assert(html.includes('Processos Manuais'), 'Problem card 1 must be in built HTML');
assert(html.includes('Escala Linear'), 'Problem card 2 must be in built HTML');
assert(html.includes('Operação por Memória'), 'Problem card 3 must be in built HTML');
assert(html.includes('Método Aptus'), 'Solution section must be in built HTML');
assert(html.includes('Auditoria'), 'Solution step 1 must be in built HTML');
assert(html.includes('Arquitetura'), 'Solution step 2 must be in built HTML');
assert(html.includes('Deploy'), 'Solution step 3 must be in built HTML');
assert(html.includes('Agendar Auditoria'), 'CTA text must be in built HTML');

// ============================================================
// 6. Semantic structure in output
// ============================================================
assert(/<header[\s>]/.test(html), 'Built HTML must include <header>');
assert(/<main[\s>]/.test(html), 'Built HTML must include <main>');
assert(/<footer[\s>]/.test(html), 'Built HTML must include <footer>');
assert(/<section[\s>]/.test(html), 'Built HTML must include <section> elements');
assert(/<dialog[\s>]/.test(html), 'Built HTML must include <dialog> element');
assert(/<h1[\s>]/.test(html), 'Built HTML must include h1');

// Only one h1
const h1Count = (html.match(/<h1[\s>]/g) || []).length;
assert(h1Count === 1, `Built HTML must have exactly 1 h1, found ${h1Count}`);

// ============================================================
// 7. Preloaded fonts
// ============================================================
assert(html.includes('rel="preload"'), 'Built HTML must preload fonts');

// ============================================================
// 8. JSON-LD structured data
// ============================================================
assert(html.includes('application/ld+json'), 'Built HTML must include JSON-LD script');

// ============================================================
// 9. Key IDs for navigation anchors
// ============================================================
assert(html.includes('id="metodo-aptus"'), 'Build must include #metodo-aptus anchor');
assert(html.includes('id="auditoria"'), 'Build must include #auditoria anchor');
assert(html.includes('id="diagnostic-modal"'), 'Build must include #diagnostic-modal');

// ============================================================
// 10. Privacy page build
// ============================================================
const privacyHtmlPath = join(distDir, 'privacidade', 'index.html');
assert(existsSync(privacyHtmlPath), 'dist/privacidade/index.html must exist');
const privacyHtml = readFileSync(privacyHtmlPath, 'utf8');
assert(privacyHtml.includes('Dados Coletados'), 'Privacy build must include LGPD content');
assert(privacyHtml.includes('LGPD'), 'Privacy build must reference LGPD');

// ============================================================
// 11. Static assets
// ============================================================
const ogImagePath = join(root, 'public/og-image.png');
assert(existsSync(ogImagePath), 'public/og-image.png must exist');

const faviconPath = join(root, 'public/favicon.svg');
assert(existsSync(faviconPath), 'public/favicon.svg must exist');

console.log('E2E build output checks passed.');
