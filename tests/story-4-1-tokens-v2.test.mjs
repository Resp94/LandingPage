import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const int = Number.parseInt(full, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function channelToLinear(channel) {
  const normalized = channel / 255;
  if (normalized <= 0.03928) return normalized / 12.92;
  return ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

function contrastRatio(foregroundHex, backgroundHex) {
  const fg = luminance(foregroundHex);
  const bg = luminance(backgroundHex);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function walkFiles(rootDir) {
  const result = [];
  for (const entry of readdirSync(rootDir)) {
    const fullPath = join(rootDir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      result.push(...walkFiles(fullPath));
      continue;
    }
    result.push(fullPath);
  }
  return result;
}

const root = process.cwd();
const globalCssPath = join(root, 'src/styles/global.css');
const sectionsDir = join(root, 'src/components/sections');

assert(existsSync(globalCssPath), 'Missing src/styles/global.css');
assert(existsSync(sectionsDir), 'Missing src/components/sections directory');
assert(!existsSync(join(root, 'tailwind.config.mjs')), 'tailwind.config.mjs must not exist in Tailwind v4 CSS-first mode');

const css = readFileSync(globalCssPath, 'utf8');

const requiredTokens = [
  ['--color-surface-primary', '#000000'],
  ['--color-surface-secondary', '#050505'],
  ['--color-surface-tertiary', '#0D0D0D'],
  ['--color-text-primary', '#F5F5F5'],
  ['--color-text-secondary', '#B3B3B3'],
  ['--color-text-meta', '#7A7A7A'],
  ['--color-border-subtle', 'rgba(255, 255, 255, 0.14)'],
  ['--color-grid-subtle', 'rgba(255, 255, 255, 0.08)'],
  ['--color-accent', '#8FFFE3'],
  ['--color-accent-data', '#A7F3FF'],
];

for (const [token, value] of requiredTokens) {
  const regex = new RegExp(`${escapeRegExp(token)}\\s*:\\s*${escapeRegExp(value)}`, 'i');
  assert(regex.test(css), `Missing required V2 token ${token}: ${value}`);
}

assert(/--font-sans:[\s\S]*'Inter'[\s\S]*'Geist'/m.test(css), 'font-sans must include Inter and Geist');
assert(/--font-mono:[\s\S]*'Geist Mono'[\s\S]*'JetBrains Mono'/m.test(css), 'font-mono must include Geist Mono with JetBrains Mono fallback');
assert(/h1\s*\{[\s\S]*font-bold[\s\S]*tracking-tight/m.test(css), 'h1 hierarchy must enforce 600-700 and tracking-tight');
assert(/h2,\s*h3\s*\{[\s\S]*font-semibold[\s\S]*tracking-tight/m.test(css), 'h2/h3 hierarchy must enforce 500-600 and tracking-tight');
assert(/body\s*\{[\s\S]*font-normal/m.test(css), 'body text must default to weight 400');
assert(/\.data-badge\s*\{[\s\S]*font-medium[\s\S]*uppercase[\s\S]*tracking-\[0\.08em\]/m.test(css), 'data badge utility must enforce mono 500 + uppercase control');

const contrastChecks = [
  ['#F5F5F5', '#0D0D0D', 17.83],
  ['#B3B3B3', '#0D0D0D', 9.27],
  ['#7A7A7A', '#0D0D0D', 4.53],
];

for (const [fg, bg, minimum] of contrastChecks) {
  const ratio = contrastRatio(fg, bg);
  assert(
    ratio + 0.01 >= minimum,
    `Contrast ratio below baseline: ${fg} on ${bg} is ${ratio.toFixed(2)} (expected >= ${minimum})`
  );
}

const sectionFiles = [
  'HeroSection.astro',
  'ProblemSection.astro',
  'SolutionSection.astro',
  'FAQSection.astro',
  'CTASection.astro',
].map((file) => join(sectionsDir, file));

for (const filePath of sectionFiles) {
  assert(existsSync(filePath), `Missing required section file: ${filePath}`);
}

const sectionContent = sectionFiles.map((filePath) => readFileSync(filePath, 'utf8')).join('\n');
assert(sectionContent.includes('text-[var(--color-text-primary)]'), 'Sections must use primary text token');
assert(sectionContent.includes('text-[var(--color-text-secondary)]'), 'Sections must use secondary text token');
assert(
  sectionContent.includes('border-[var(--color-border-subtle)]') ||
    sectionContent.includes('divide-[var(--color-border-subtle)]'),
  'Sections must use tokenized 1px engineering lines for borders/dividers'
);

const bannedAccentLongTextPatterns = [
  /<p[^>]*text-accent/i,
  /<p[^>]*text-\[var\(--color-accent\)\]/i,
  /<p[^>]*text-\[var\(--color-accent-data\)\]/i,
  /<h[1-3][^>]*text-accent/i,
  /<h[1-3][^>]*text-\[var\(--color-accent\)\]/i,
  /<h[1-3][^>]*text-\[var\(--color-accent-data\)\]/i,
];

for (const pattern of bannedAccentLongTextPatterns) {
  assert(!pattern.test(sectionContent), `Accent misuse detected in section long-copy/headline: ${pattern}`);
}

const legacyPalette = ['#fc5400', '#fc7800', '#0c0000', '#3c0000', '#600000'];
const sourceFiles = walkFiles(join(root, 'src')).filter((filePath) =>
  /\.(astro|css|js|ts|mjs|cjs)$/i.test(filePath)
);

for (const filePath of sourceFiles) {
  const content = readFileSync(filePath, 'utf8').toLowerCase();
  for (const value of legacyPalette) {
    assert(!content.includes(value), `Legacy palette value ${value} found in ${filePath}`);
  }
}

console.log('Story 4.1 token V2 checks passed.');
