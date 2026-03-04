import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

const root = process.cwd();
const badgePath = join(root, 'src/components/ui/DataMatrixBadge.astro');
const problemPath = join(root, 'src/components/sections/ProblemSection.astro');
const solutionPath = join(root, 'src/components/sections/SolutionSection.astro');

assert(existsSync(badgePath), 'Missing src/components/ui/DataMatrixBadge.astro');
assert(existsSync(problemPath), 'Missing src/components/sections/ProblemSection.astro');
assert(existsSync(solutionPath), 'Missing src/components/sections/SolutionSection.astro');

const badge = readFileSync(badgePath, 'utf8');
const problem = readFileSync(problemPath, 'utf8');
const solution = readFileSync(solutionPath, 'utf8');

// Props interface
assert(badge.includes('interface Props'), 'DataMatrixBadge must define Props interface');
assert(badge.includes('label?: string'), 'Props must include optional label');
assert(badge.includes('value: string | number'), 'Props must include required value (string|number)');

// Rendering: monospace font
assert(badge.includes('font-mono'), 'Badge must use monospace font');
assert(badge.includes('text-sm'), 'Badge must use text-sm');

// Rendering: prefix indicator (>)
assert(badge.includes('&gt;'), 'Badge must render ">" prefix indicator');
assert(badge.includes('select-none'), 'Prefix must be non-selectable');

// Rendering: label conditional display
assert(badge.includes('{label &&'), 'Badge must conditionally render label');
assert(badge.includes('text-zinc-400'), 'Label must use text-zinc-400');

// Rendering: value display
assert(badge.includes('font-semibold'), 'Value must be font-semibold');
assert(badge.includes('{value}'), 'Badge must render value');

// Structural: inline-flex layout
assert(badge.includes('inline-flex'), 'Badge must use inline-flex');
assert(badge.includes('items-center'), 'Badge must center items');
assert(badge.includes('gap-2'), 'Badge must have gap-2');

// Integration: used in ProblemSection
assert(problem.includes("import DataMatrixBadge"), 'ProblemSection must import DataMatrixBadge');
const problemBadgeCount = (problem.match(/<DataMatrixBadge/g) || []).length;
assert(problemBadgeCount >= 6, `ProblemSection must use DataMatrixBadge at least 6 times, found ${problemBadgeCount}`);

// Integration: used in SolutionSection (rendered inside .map() loop over 3 steps)
assert(solution.includes("import DataMatrixBadge"), 'SolutionSection must import DataMatrixBadge');
const solutionBadgeCount = (solution.match(/<DataMatrixBadge/g) || []).length;
assert(solutionBadgeCount >= 1, `SolutionSection must use DataMatrixBadge at least once, found ${solutionBadgeCount}`);
// Verify the steps data array contains metric data for badges
assert(solution.includes('metricLabel:'), 'SolutionSection steps must define metricLabel for badges');
assert(solution.includes('metricValue:'), 'SolutionSection steps must define metricValue for badges');

// Zero-JS
assert(!badge.includes('<script'), 'DataMatrixBadge must not contain scripts');

console.log('E2E DataMatrixBadge checks passed.');
