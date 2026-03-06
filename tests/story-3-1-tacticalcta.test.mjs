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
const modalPath = join(root, 'src/components/ui/DiagnosticModal.astro');

assert(existsSync(ctaPath), 'Missing src/components/ui/TacticalCTA.astro');
assert(existsSync(heroPath), 'Missing src/components/sections/HeroSection.astro');
assert(existsSync(headerPath), 'Missing src/components/layout/Header.astro');
assert(existsSync(ctaSectionPath), 'Missing src/components/sections/CTASection.astro');
assert(existsSync(modalPath), 'Missing src/components/ui/DiagnosticModal.astro');

const ctaContent = readFileSync(ctaPath, 'utf8');
const heroContent = readFileSync(heroPath, 'utf8');
const headerContent = readFileSync(headerPath, 'utf8');
const ctaSectionContent = readFileSync(ctaSectionPath, 'utf8');
const modalContent = readFileSync(modalPath, 'utf8');

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
assert(ctaContent.includes('group-hover:translate-x-1'), 'Icon must translate 4px on hover');
assert(ctaContent.includes('border-transparent'), 'Default state must include border-transparent');
assert(ctaContent.includes('text-[var(--color-surface-primary)]'), 'Default state must include primary text token');
assert(ctaContent.includes('bg-[var(--color-accent)]'), 'Default state must include accent background');
assert(
  ctaContent.includes('hover:bg-[var(--color-accent-hover)]'),
  'Hover state must include hover:bg-[var(--color-accent-hover)]'
);
assert(ctaContent.includes('hover:scale-[1.02]'), 'Hover state must include subtle scale up');
assert(ctaContent.includes('active:scale-95'), 'Active state must include scale down');
assert(ctaContent.includes('disabled:opacity-50'), 'Disabled state must include opacity-50');
assert(ctaContent.includes('disabled:cursor-not-allowed'), 'Disabled state must include cursor-not-allowed');
assert(ctaContent.includes('transition-all'), 'Must include transition-all');
assert(ctaContent.includes('duration-300'), 'Must include duration-300');
assert(ctaContent.includes('ease-out'), 'Must include ease-out');

// Task 3: Accessibility Implementation
assert(ctaContent.includes('aria-label='), 'Must support or define aria-label');
assert(
  ctaContent.includes('Agendar Auditoria'),
  'Must include Agendar Auditoria copy in default text/aria-label'
);
assert(ctaContent.includes('focus-visible:ring-2'), 'Must include focus-visible:ring-2');
assert(ctaContent.includes('focus-visible:ring-accent'), 'Must include focus-visible:ring-accent');

// Task 4: Action Trigger Logic
assert(ctaContent.includes('data-tactical-cta'), 'CTA button must expose data-tactical-cta trigger marker');
assert(
  modalContent.includes("target?.closest('button[data-tactical-cta]')"),
  'DiagnosticModal must detect CTA clicks by delegated selector'
);
assert(
  modalContent.includes("new CustomEvent('open-diagnostic'") ||
    modalContent.includes('new CustomEvent("open-diagnostic"'),
  'DiagnosticModal delegated click handler must dispatch open-diagnostic custom event'
);
assert(
  modalContent.includes("document.addEventListener('click', handleTacticalCtaClick)"),
  'Delegated click listener must be bound globally'
);
assert(!modalContent.includes('cloneNode(true)'), 'Must not clone CTA DOM nodes when binding events');
assert(!modalContent.includes('replaceChild('), 'Must not replace CTA nodes when binding events');

// Task 5: Responsive layout
assert(ctaContent.includes('w-full') && ctaContent.includes('w-auto'), 'CTA must support full-width and auto-width modes');
assert(
  ctaSectionContent.includes('w-full') &&
    ctaSectionContent.includes('sm:w-auto') &&
    ctaSectionContent.includes('shadow-2xl'),
  'CTASection usage must be full-width on mobile with accent emphasis'
);

console.log('Story 3.1 smoke checks passed.');
