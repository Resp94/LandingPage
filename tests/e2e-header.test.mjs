import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

const root = process.cwd();
const headerPath = join(root, 'src/components/layout/Header.astro');
const baseLayoutPath = join(root, 'src/layouts/BaseLayout.astro');

assert(existsSync(headerPath), 'Missing src/components/layout/Header.astro');
assert(existsSync(baseLayoutPath), 'Missing src/layouts/BaseLayout.astro');

const header = readFileSync(headerPath, 'utf8');
const baseLayout = readFileSync(baseLayoutPath, 'utf8');

// Integration: Header imported and rendered in BaseLayout
assert(baseLayout.includes("import Header"), 'BaseLayout must import Header');
assert(baseLayout.includes('<Header />'), 'BaseLayout must render Header');

// Semantic structure: uses <header> element
assert(header.includes('<header'), 'Header must use <header> element');

// Fixed/sticky navigation
assert(header.includes('fixed'), 'Header must be fixed position');
assert(header.includes('top-0'), 'Header must be pinned to top');
assert(header.includes('z-50'), 'Header must have high z-index');
assert(header.includes('w-full'), 'Header must be full width');

// Glassmorphism backdrop
assert(header.includes('bg-zinc-950/80'), 'Header must have semi-transparent bg');
assert(header.includes('backdrop-blur'), 'Header must include backdrop blur');
assert(header.includes('border-b'), 'Header must have bottom border');
assert(header.includes('border-zinc-800/50'), 'Header border must be subtle zinc-800/50');

// Logo present and accessible
assert(header.includes('<svg'), 'Header must include SVG logo');
assert(header.includes('Aptus'), 'SVG logo must include "Aptus" text');
assert(header.includes('href="/"'), 'Logo must link to homepage');
assert(header.includes('aria-label="Aptus Home"'), 'Logo link must have aria-label');

// TacticalCTA integration
assert(header.includes("import TacticalCTA"), 'Header must import TacticalCTA');
assert(header.includes('<TacticalCTA'), 'Header must render TacticalCTA');

// Responsive layout (flex-col for mobile, flex-row for sm+)
assert(
    header.includes('flex-col sm:flex-row') || header.includes('flex flex-col sm:flex-row'),
    'Header must use responsive flex layout'
);

// Accessibility: focus-visible styles
assert(header.includes('focus-visible:ring-2'), 'Logo must have focus-visible ring');
assert(header.includes('focus-visible:ring-emerald-500'), 'Logo focus ring must be emerald-500');

// Container max-width
assert(header.includes('max-w-7xl'), 'Header container must use max-w-7xl');

// No client-side scripts (zero-JS header)
assert(!header.includes('<script'), 'Header must not contain inline scripts');

console.log('E2E Header checks passed.');
