import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();

const heroPath = join(root, 'src/components/sections/HeroSection.astro');
const solutionPath = join(root, 'src/components/sections/SolutionSection.astro');

assert(existsSync(heroPath), 'Missing src/components/sections/HeroSection.astro');
assert(existsSync(solutionPath), 'Missing src/components/sections/SolutionSection.astro');

const hero = readFileSync(heroPath, 'utf8');
const solution = readFileSync(solutionPath, 'utf8');

assert(
  hero.includes('href="#metodo-aptus"'),
  'Hero skip link must point to #metodo-aptus to preserve narrative flow'
);

assert(solution.includes('id="metodo-aptus"'), 'Solution section must expose id="metodo-aptus"');
assert(solution.includes('<ol class="grid grid-cols-1 lg:grid-cols-3'), 'Solution steps must use ordered list semantics');
assert(solution.includes('title: "Auditoria"'), 'Solution steps must include Auditoria');
assert(solution.includes('title: "Arquitetura"'), 'Solution steps must include Arquitetura');
assert(solution.includes('title: "Deploy"'), 'Solution steps must include Deploy');
assert(solution.includes('number: "01"'), 'Solution steps must include 01 numbering');
assert(solution.includes('number: "02"'), 'Solution steps must include 02 numbering');
assert(solution.includes('number: "03"'), 'Solution steps must include 03 numbering');
assert(solution.includes('font-mono text-4xl'), 'Step numbers must use mono font styling');
assert(solution.includes('line-clamp-3'), 'Step description must clamp to max 3 lines');
assert(solution.includes('DataMatrixBadge'), 'Solution section must render DataMatrixBadge metrics');
assert(solution.includes('divide-zinc-800/50'), 'Solution section must include structural divider lines');
assert(solution.includes('border border-zinc-800/50'), 'Solution section must include blueprint border treatment');
assert(solution.includes('scroll-reveal p-8 lg:p-12'), 'Each phase block must include scroll-reveal');

console.log('Story 2.3 solution checks passed.');
