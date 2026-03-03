import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const ctaPath = join(root, 'src/components/ui/TacticalCTA.astro');
const heroPath = join(root, 'src/components/sections/HeroSection.astro');
const headerPath = join(root, 'src/components/layout/Header.astro');
const ctaSectionPath = join(root, 'src/components/sections/CTASection.astro');

assert(existsSync(ctaPath), 'Missing src/components/ui/TacticalCTA.astro');
assert(existsSync(heroPath), 'Missing src/components/sections/HeroSection.astro');
assert(existsSync(headerPath), 'Missing src/components/layout/Header.astro');
assert(existsSync(ctaSectionPath), 'Missing src/components/sections/CTASection.astro');

const ctaContent = readFileSync(ctaPath, 'utf8');
const heroContent = readFileSync(heroPath, 'utf8');
const headerContent = readFileSync(headerPath, 'utf8');
const ctaSectionContent = readFileSync(ctaSectionPath, 'utf8');

// Task 1: Semantic Structure, placement, and Props
assert(ctaContent.includes('<button'), 'Must use <button> element');
assert(ctaContent.includes('interface Props {'), 'Must have TypeScript Props interface');
assert(heroContent.includes('import TacticalCTA'), 'HeroSection must import TacticalCTA');
assert(heroContent.includes('<TacticalCTA'), 'HeroSection must render TacticalCTA');
assert(headerContent.includes('<TacticalCTA'), 'Header must render TacticalCTA');
assert(ctaSectionContent.includes('<TacticalCTA'), 'CTASection must render TacticalCTA');

// Task 2: Component Styling
assert(ctaContent.includes('uppercase'), 'Must have uppercase class');
assert(ctaContent.includes('tracking-wider'), 'Must have tracking-wider class');
assert(ctaContent.includes('font-sans'), 'Must use Inter font via font-sans token');
assert(ctaContent.includes('translate-x-1'), 'Icon must translate 4px on hover');
assert(ctaContent.includes('border-zinc-700'), 'Default state must include border-zinc-700');
assert(ctaContent.includes('text-zinc-300'), 'Default state must include text-zinc-300');
assert(ctaContent.includes('bg-transparent'), 'Default state must include bg-transparent');
assert(
  ctaContent.includes('hover:border-emerald-500/50'),
  'Hover state must include hover:border-emerald-500/50'
);
assert(ctaContent.includes('hover:bg-emerald-500/10'), 'Hover state must include hover:bg-emerald-500/10');
assert(ctaContent.includes('hover:text-emerald-400'), 'Hover state must include hover:text-emerald-400');
assert(ctaContent.includes('opacity-50'), 'Disabled state must include opacity-50');
assert(ctaContent.includes('cursor-not-allowed'), 'Disabled state must include cursor-not-allowed');
assert(ctaContent.includes('transition-all'), 'Must include transition-all');
assert(ctaContent.includes('duration-200'), 'Must include duration-200');
assert(ctaContent.includes('ease-out'), 'Must include ease-out');

// Task 3: Accessibility Implementation
assert(ctaContent.includes('aria-label='), 'Must support or define aria-label');
assert(
  ctaContent.includes('Agendar Auditoria Estratégica'),
  'Must have Agendar Auditoria Estratégica as default aria-label text'
);
assert(ctaContent.includes('focus-visible:ring-2'), 'Must include focus-visible:ring-2');
assert(ctaContent.includes('focus-visible:ring-emerald-500'), 'Must include focus-visible:ring-emerald-500');

// Task 4: Action Trigger Logic
assert(ctaContent.includes('<script'), 'Must include client-side script');
assert(
  ctaContent.includes("CustomEvent('open-diagnostic'") || ctaContent.includes('CustomEvent("open-diagnostic"'),
  'Must dispatch open-diagnostic custom event'
);
assert(ctaContent.includes('dispatchEvent'), 'Must call dispatchEvent');
assert(!ctaContent.includes('cloneNode(true)'), 'Must not clone CTA DOM nodes when binding events');
assert(!ctaContent.includes('replaceChild('), 'Must not replace CTA nodes when binding events');
assert(!ctaContent.includes('setTimeout('), 'Click dispatch should not be delayed');

// Task 5: Responsive layout
assert(ctaContent.includes('w-full'), 'Must dynamically apply w-full');
assert(
  ctaSectionContent.includes('w-full sm:w-auto') || ctaSectionContent.includes('fullWidth'),
  'CTASection usage must be full-width on mobile for standalone CTA context'
);

console.log('Story 3.1 smoke checks passed.');
