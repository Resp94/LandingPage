import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

const root = process.cwd();

// --- All component paths ---
const baseLayoutPath = join(root, 'src/layouts/BaseLayout.astro');
const indexPath = join(root, 'src/pages/index.astro');
const privacyPath = join(root, 'src/pages/privacidade.astro');
const headerPath = join(root, 'src/components/layout/Header.astro');
const footerPath = join(root, 'src/components/layout/Footer.astro');
const heroPath = join(root, 'src/components/sections/HeroSection.astro');
const problemPath = join(root, 'src/components/sections/ProblemSection.astro');
const solutionPath = join(root, 'src/components/sections/SolutionSection.astro');
const ctaPath = join(root, 'src/components/sections/CTASection.astro');
const modalPath = join(root, 'src/components/ui/DiagnosticModal.astro');
const formEmbedPath = join(root, 'src/components/ui/FormEmbed.astro');

const allPaths = [
    baseLayoutPath, indexPath, privacyPath, headerPath, footerPath,
    heroPath, problemPath, solutionPath, ctaPath, modalPath, formEmbedPath,
];

allPaths.forEach((p) => assert(existsSync(p), `Missing: ${p}`));

const read = (p) => readFileSync(p, 'utf8');

const baseLayout = read(baseLayoutPath);
const index = read(indexPath);
const privacy = read(privacyPath);
const header = read(headerPath);
const footer = read(footerPath);
const hero = read(heroPath);
const problem = read(problemPath);
const solution = read(solutionPath);
const cta = read(ctaPath);
const modal = read(modalPath);
const formEmbed = read(formEmbedPath);

// ============================================================
// 1. Language and Locale
// ============================================================
assert(baseLayout.includes('lang="pt-BR"'), 'HTML must declare lang="pt-BR"');

// ============================================================
// 2. SEO Meta Tags
// ============================================================
assert(baseLayout.includes('<meta charset="UTF-8"'), 'Must include charset meta');
assert(baseLayout.includes('name="viewport"'), 'Must include viewport meta');
assert(baseLayout.includes('<title>'), 'Must include title tag');
assert(baseLayout.includes('name="description"'), 'Must include description meta');
assert(baseLayout.includes('rel="canonical"'), 'Must include canonical link');

// Open Graph
assert(baseLayout.includes('property="og:type"'), 'Must include og:type');
assert(baseLayout.includes('property="og:title"'), 'Must include og:title');
assert(baseLayout.includes('property="og:description"'), 'Must include og:description');
assert(baseLayout.includes('property="og:image"'), 'Must include og:image');
assert(baseLayout.includes('property="og:url"'), 'Must include og:url');

// Twitter Card
assert(baseLayout.includes('property="twitter:card"'), 'Must include twitter:card');
assert(baseLayout.includes('property="twitter:title"'), 'Must include twitter:title');
assert(baseLayout.includes('property="twitter:image"'), 'Must include twitter:image');

// Structured Data (JSON-LD)
assert(baseLayout.includes('application/ld+json'), 'Must include JSON-LD structured data');
assert(baseLayout.includes('"@type": "Organization"'), 'Structured data must be Organization type');

// ============================================================
// 3. Heading Hierarchy — Single h1, proper nesting
// ============================================================
const h1InHero = (hero.match(/<h1/g) || []).length;
assert(h1InHero === 1, 'HeroSection must have exactly 1 h1');

// No other section should have h1
[problem, solution, cta, footer, header].forEach((content) => {
    assert(!(/<h1[\s>]/.test(content)), 'Only Hero should contain h1; other sections must use h2+');
});

// h2 headings in appropriate sections
assert(/<h2[\s>]/.test(problem), 'ProblemSection must use h2');
assert(/<h2[\s>]/.test(solution), 'SolutionSection must use h2');
assert(/<h2[\s>]/.test(cta), 'CTASection must use h2');

// h3 headings in sub-sections
assert(/<h3[\s>]/.test(problem), 'ProblemSection cards must use h3');
assert(/<h3[\s>]/.test(solution), 'SolutionSection steps must use h3');

// ============================================================
// 4. Semantic HTML Elements
// ============================================================
assert(/<section[\s>]/.test(hero), 'HeroSection must use <section>');
assert(/<section[\s>]/.test(problem), 'ProblemSection must use <section>');
assert(/<section[\s>]/.test(solution), 'SolutionSection must use <section>');
assert(/<section[\s>]/.test(cta), 'CTASection must use <section>');
assert(/<header[\s>]/.test(header), 'Header must use <header>');
assert(/<footer[\s>]/.test(footer), 'Footer must use <footer>');
assert(/<main[\s>]/.test(baseLayout), 'BaseLayout must include <main>');
assert(/<dialog[\s>]/.test(modal), 'DiagnosticModal must use <dialog>');
assert(/<noscript>/.test(formEmbed), 'FormEmbed must include <noscript> fallback');

// ============================================================
// 5. ARIA Landmarks and Attributes
// ============================================================
assert(solution.includes('aria-labelledby="solution-title"'), 'Solution section must have aria-labelledby');
assert(cta.includes('aria-labelledby="cta-title"'), 'CTA section must have aria-labelledby');
assert(modal.includes('aria-modal="true"'), 'Modal must declare aria-modal');
assert(modal.includes('role="dialog"'), 'Modal must have role="dialog"');
assert(modal.includes('role="status"'), 'Success view must have role="status"');
assert(modal.includes('aria-live="polite"'), 'Success view must use aria-live="polite"');

// ============================================================
// 6. Font Preloading (performance + accessibility)
// ============================================================
assert(baseLayout.includes('rel="preload"'), 'Must preload fonts');
assert(baseLayout.includes('as="font"'), 'Preloaded resources must be typed as font');
assert(baseLayout.includes('crossorigin="anonymous"'), 'Font preloads must include crossorigin');
assert(baseLayout.includes('.woff2'), 'Must preload woff2 font files');

// ============================================================
// 7. Privacy Page (LGPD compliance)
// ============================================================
assert(privacy.includes('import BaseLayout'), 'Privacy page must use BaseLayout');
assert(privacy.includes('Dados Coletados'), 'Privacy must include "Dados Coletados" section');
assert(privacy.includes('Processamento e Compartilhamento'), 'Privacy must include processing section');
assert(privacy.includes('Seus Direitos (LGPD)'), 'Privacy must include LGPD rights section');
assert(privacy.includes('Contato do Controlador de Dados'), 'Privacy must include data controller contact');

// ============================================================
// 8. Index Page — Complete section assembly
// ============================================================
assert(index.includes('<HeroSection />'), 'Index must assemble HeroSection');
assert(index.includes('<ProblemSection />'), 'Index must assemble ProblemSection');
assert(index.includes('<SolutionSection />'), 'Index must assemble SolutionSection');
assert(index.includes('<CTASection />'), 'Index must assemble CTASection');
assert(index.includes('<DiagnosticModal />'), 'Index must assemble DiagnosticModal');

// Section order in index
const positions = {
    hero: index.indexOf('<HeroSection />'),
    problem: index.indexOf('<ProblemSection />'),
    solution: index.indexOf('<SolutionSection />'),
    cta: index.indexOf('<CTASection />'),
    modal: index.indexOf('<DiagnosticModal />'),
};

assert(
    positions.hero < positions.problem &&
    positions.problem < positions.solution &&
    positions.solution < positions.cta &&
    positions.cta < positions.modal,
    'Index must assemble sections in order: Hero → Problem → Solution → CTA → Modal'
);

// ============================================================
// 9. Body layout
// ============================================================
assert(baseLayout.includes('flex flex-col min-h-screen'), 'Body must use flexbox full-height layout');
assert(baseLayout.includes('flex-grow'), 'Main content must flex-grow');

console.log('E2E global accessibility & SEO checks passed.');
