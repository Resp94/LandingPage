import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();

const indexPath = join(root, 'src/pages/index.astro');
const ctaPath = join(root, 'src/components/sections/CTASection.astro');
const privacyPath = join(root, 'src/pages/privacidade.astro');
const footerPath = join(root, 'src/components/layout/Footer.astro');

assert(existsSync(indexPath), 'Missing src/pages/index.astro');
assert(existsSync(ctaPath), 'Missing src/components/sections/CTASection.astro');
assert(existsSync(privacyPath), 'Missing src/pages/privacidade.astro');
assert(existsSync(footerPath), 'Missing src/components/layout/Footer.astro');

const index = readFileSync(indexPath, 'utf8');
const heroPos = index.indexOf('<HeroSection />');
const problemPos = index.indexOf('<ProblemSection />');
const solutionPos = index.indexOf('<SolutionSection />');
const ctaPos = index.indexOf('<CTASection />');

assert(heroPos >= 0, 'HeroSection is missing in index.astro');
assert(problemPos >= 0, 'ProblemSection is missing in index.astro');
assert(solutionPos >= 0, 'SolutionSection is missing in index.astro');
assert(ctaPos >= 0, 'CTASection is missing in index.astro');
assert(heroPos < problemPos && problemPos < solutionPos && solutionPos < ctaPos, 'Section order must be Hero -> Problem -> Solution -> CTA');

const cta = readFileSync(ctaPath, 'utf8');
assert(cta.includes('py-24 lg:py-32'), 'CTASection must use py-24 lg:py-32');
assert(cta.includes('scroll-reveal'), 'CTASection must include scroll-reveal class');
assert(cta.includes('<TacticalCTA'), 'CTASection must render TacticalCTA');
assert(cta.includes('border-emerald-500/70'), 'CTASection TacticalCTA must use Emerald-accented default style');

const privacy = readFileSync(privacyPath, 'utf8');
assert(privacy.includes('import BaseLayout'), 'Privacy page must use BaseLayout');
assert(
  privacy.includes('Dados Coletados') &&
    privacy.includes('Processamento e Compartilhamento') &&
    privacy.includes('Seus Direitos (LGPD)') &&
    privacy.includes('Contato do Controlador de Dados'),
  'Privacy page must include LGPD required sections'
);

const footer = readFileSync(footerPath, 'utf8');
assert(footer.includes('href="/privacidade"'), 'Footer must link to /privacidade');

console.log('Story 2.4 smoke checks passed.');