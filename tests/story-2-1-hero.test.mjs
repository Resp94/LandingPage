import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const heroPath = join(root, 'src/components/sections/HeroSection.astro');

assert(existsSync(heroPath), 'Missing src/components/sections/HeroSection.astro');

const hero = readFileSync(heroPath, 'utf8');

// AC3: Headline quality and typography
assert(hero.includes('Pare de Automatizar o Caos'), 'Hero headline copy must match approved text');
assert(
  hero.includes('text-[var(--color-text-primary)]') &&
    hero.includes('tracking-tight') &&
    hero.includes('font-bold') &&
    hero.includes('text-4xl') &&
    hero.includes('sm:text-5xl') &&
    hero.includes('md:text-6xl') &&
    hero.includes('lg:text-7xl'),
  'Hero headline must keep required typography classes'
);

// AC4: Subheadline (Engenharia Operacional), updated palette
assert(hero.includes('Engenharia Operacional'), 'Hero subheadline must describe Engenharia Operacional');
assert(
  hero.includes('text-[var(--color-text-secondary)]'),
  'Hero subheadline must use the V2 secondary text token'
);
assert(hero.includes('leading-relaxed'), 'Hero subheadline must keep readable leading');

// AC5: TacticalCTA prominent and with required copy
assert(hero.includes('<TacticalCTA'), 'Hero must render TacticalCTA');
assert(hero.includes('text="Agendar Auditoria"'), 'Hero CTA text must be Agendar Auditoria');
assert(hero.indexOf('<TacticalCTA') > hero.indexOf('<p'), 'Hero CTA must be rendered below the subheadline');

// AC6: Section spacing and centering
assert(
  hero.includes('w-full') && hero.includes('py-24') && hero.includes('lg:py-32'),
  'Hero section must use w-full and py-24/lg:py-32 spacing'
);
assert(hero.includes('max-w-7xl') && hero.includes('mx-auto'), 'Hero wrapper must use max-w-7xl mx-auto');

// AC7 + AC8: scroll reveal, responsive text size, mobile left align
assert(hero.includes('scroll-reveal'), 'Hero must include scroll-reveal class');
assert(hero.includes('text-4xl'), 'Hero must scale down text for mobile');
assert(hero.includes('text-left') && hero.includes('md:text-center'), 'Hero must be left-aligned on mobile');

// AC9 + AC10 guardrails
assert(!hero.includes('<img'), 'Hero must not include stock/AI image elements');
assert(!hero.includes('<script'), 'Hero must remain static HTML without inline script');
assert(!hero.includes('client:load') && !hero.includes('client:visible'), 'Hero must not use client hydration directives');

console.log('Story 2.1 hero checks passed.');
