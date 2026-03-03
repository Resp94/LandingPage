import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function readPngDimensions(buffer) {
  const signature = buffer.subarray(0, 8).toString('hex');
  assert(signature === '89504e470d0a1a0a', 'Invalid PNG signature for og-image.png');
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

const root = process.cwd();

const packagePath = join(root, 'package.json');
const indexPath = join(root, 'src/pages/index.astro');
const baseLayoutPath = join(root, 'src/layouts/BaseLayout.astro');
const heroPath = join(root, 'src/components/sections/HeroSection.astro');
const ctaPath = join(root, 'src/components/sections/CTASection.astro');
const ogImagePath = join(root, 'public/og-image.png');
const lighthouseConfigPath = join(root, 'lighthouserc.cjs');

assert(existsSync(packagePath), 'Missing package.json');
assert(existsSync(indexPath), 'Missing src/pages/index.astro');
assert(existsSync(baseLayoutPath), 'Missing src/layouts/BaseLayout.astro');
assert(existsSync(heroPath), 'Missing src/components/sections/HeroSection.astro');
assert(existsSync(ctaPath), 'Missing src/components/sections/CTASection.astro');
assert(existsSync(ogImagePath), 'Missing public/og-image.png');
assert(existsSync(lighthouseConfigPath), 'Missing lighthouserc.cjs');

const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
assert(
  typeof pkg.scripts?.lighthouse === 'string' &&
    pkg.scripts.lighthouse.includes('@lhci/cli') &&
    pkg.scripts.lighthouse.includes('--config=lighthouserc.cjs'),
  'Lighthouse script must execute LHCI with lighthouserc.cjs'
);

const index = readFileSync(indexPath, 'utf8');
const heroPos = index.indexOf('<HeroSection />');
const problemPos = index.indexOf('<ProblemSection />');
const solutionPos = index.indexOf('<SolutionSection />');
const ctaPos = index.indexOf('<CTASection />');

assert(heroPos >= 0, 'HeroSection is missing in index.astro');
assert(problemPos >= 0, 'ProblemSection is missing in index.astro');
assert(solutionPos >= 0, 'SolutionSection is missing in index.astro');
assert(ctaPos >= 0, 'CTASection is missing in index.astro');
assert(
  heroPos < problemPos && problemPos < solutionPos && solutionPos < ctaPos,
  'Section order must be Hero -> Problem -> Solution -> CTA'
);

const baseLayout = readFileSync(baseLayoutPath, 'utf8');
assert(baseLayout.includes('<ScrollReveal />'), 'BaseLayout must include ScrollReveal provider');
assert(baseLayout.includes("image = '/og-image.png'"), 'BaseLayout default OG image must be /og-image.png');
assert(baseLayout.includes('property="og:image"'), 'BaseLayout must expose og:image meta tag');

const hero = readFileSync(heroPath, 'utf8');
assert(hero.includes('href="#auditoria"'), 'Hero CTA must point to #auditoria');

const cta = readFileSync(ctaPath, 'utf8');
assert(cta.includes('id="auditoria"'), 'CTA section must define id="auditoria"');

const lighthouseConfig = readFileSync(lighthouseConfigPath, 'utf8');
assert(lighthouseConfig.includes('categories:performance'), 'Lighthouse config must assert performance');
assert(lighthouseConfig.includes('categories:accessibility'), 'Lighthouse config must assert accessibility');
assert(lighthouseConfig.includes('categories:best-practices'), 'Lighthouse config must assert best-practices');
assert(lighthouseConfig.includes('categories:seo'), 'Lighthouse config must assert SEO');
assert(lighthouseConfig.includes('minScore: 0.95'), 'Lighthouse config must enforce >= 0.95 scores');

const ogImage = readFileSync(ogImagePath);
const { width, height } = readPngDimensions(ogImage);
assert(width === 1200 && height === 630, `OG image must be 1200x630, got ${width}x${height}`);

console.log('Story 2.5 smoke checks passed.');
