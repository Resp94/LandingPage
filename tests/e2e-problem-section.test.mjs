import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

const root = process.cwd();
const problemPath = join(root, 'src/components/sections/ProblemSection.astro');
const indexPath = join(root, 'src/pages/index.astro');

assert(existsSync(problemPath), 'Missing src/components/sections/ProblemSection.astro');
assert(existsSync(indexPath), 'Missing src/pages/index.astro');

const problem = readFileSync(problemPath, 'utf8');
const index = readFileSync(indexPath, 'utf8');

// Integration: ProblemSection is used in index.astro
assert(index.includes('<ProblemSection />'), 'index.astro must render ProblemSection');

// Semantic structure: uses <section> with ul/li grid
assert(problem.includes('<section'), 'ProblemSection must use a <section> element');
assert(problem.includes('<ul class="grid'), 'Problem grid must use <ul> for semantics');
assert(problem.includes('<li class='), 'Each problem card must be an <li>');

// Content: Three problem cards with correct titles
assert(problem.includes('Processos Manuais'), 'Must include "Processos Manuais" problem');
assert(problem.includes('Escala Linear'), 'Must include "Escala Linear" problem');
assert(problem.includes('Operação por Memória'), 'Must include "Operação por Memória" problem');

// Data codes from DataMatrixBadge
assert(problem.includes('ERR_MANUAL'), 'Must include ERR_MANUAL badge code');
assert(problem.includes('SCL_LINEAR'), 'Must include SCL_LINEAR badge code');
assert(problem.includes('MEM_DEP'), 'Must include MEM_DEP badge code');

// Metric badges
assert(problem.includes('Tempo Perdido'), 'Must include "Tempo Perdido" metric label');
assert(problem.includes('40%'), 'Must include "40%" metric value');
assert(problem.includes('Gargalo'), 'Must include "Gargalo" metric label');
assert(problem.includes('Contratação'), 'Must include "Contratação" metric value');
assert(problem.includes('Risco Operacional'), 'Must include "Risco Operacional" metric label');
assert(problem.includes('Crítico'), 'Must include "Crítico" metric value');

// Section headline and subheadline
assert(problem.includes('voo cego'), 'Section headline must include "voo cego"');
assert(problem.includes('caos operacional'), 'Section subheadline must reference caos operacional');

// Headline uses h2 with correct typography
assert(problem.includes('<h2'), 'Section headline must be h2');
assert(
    problem.includes('text-4xl') && problem.includes('lg:text-5xl'),
    'Section headline must scale responsively'
);

// Problem cards use h3 headings
assert(problem.includes('<h3'), 'Problem card titles must be h3 elements');

// Responsive grid layout
assert(
    problem.includes('grid-cols-1') &&
      problem.includes('md:grid-cols-2') &&
      problem.includes('lg:grid-cols-3'),
    'Grid must be responsive: 1 col mobile, 2 cols tablet, 3 cols desktop'
);

// Card styling (blueprint aesthetic)
assert(
    problem.includes('border border-[var(--color-surface-secondary)]/10'),
    'Problem cards must use subtle blueprint border styling'
);

// Scroll-reveal animations with staggered delays
assert(problem.includes('scroll-reveal'), 'Problem cards must include scroll-reveal class');
assert(problem.includes('delay-100'), 'Second card must have delay-100');
assert(problem.includes('delay-200'), 'Third card must have delay-200');

// Icons are decorative (aria-hidden)
assert(problem.includes('aria-hidden="true"'), 'SVG icons must be aria-hidden');
assert(problem.includes('focusable="false"'), 'SVG icons must be non-focusable');

// Theme token styling
assert(problem.includes('bg-[var(--color-surface-light)]'), 'Section must use light surface background token');
assert(problem.includes('text-[var(--color-surface-primary)]'), 'Headings must use primary surface token');
assert(problem.includes('text-[var(--color-surface-secondary)]'), 'Descriptions must use secondary surface token');

// DataMatrixBadge import
assert(problem.includes("import DataMatrixBadge"), 'Must import DataMatrixBadge component');

// No client-side scripts (zero-JS section)
assert(!problem.includes('<script'), 'ProblemSection must not contain inline scripts');
assert(!problem.includes('client:load'), 'ProblemSection must not use client:load');
assert(!problem.includes('client:visible'), 'ProblemSection must not use client:visible');

console.log('E2E ProblemSection checks passed.');
