import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

const root = process.cwd();
const scrollRevealComponentPath = join(root, 'src/components/ui/ScrollReveal.astro');
const scrollRevealScriptPath = join(root, 'src/scripts/scrollReveal.ts');
const baseLayoutPath = join(root, 'src/layouts/BaseLayout.astro');

assert(existsSync(scrollRevealComponentPath), 'Missing src/components/ui/ScrollReveal.astro');
assert(existsSync(scrollRevealScriptPath), 'Missing src/scripts/scrollReveal.ts');
assert(existsSync(baseLayoutPath), 'Missing src/layouts/BaseLayout.astro');

const component = readFileSync(scrollRevealComponentPath, 'utf8');
const script = readFileSync(scrollRevealScriptPath, 'utf8');
const baseLayout = readFileSync(baseLayoutPath, 'utf8');

// Integration: ScrollReveal included in BaseLayout
assert(baseLayout.includes("import ScrollReveal"), 'BaseLayout must import ScrollReveal');
assert(baseLayout.includes('<ScrollReveal />'), 'BaseLayout must render ScrollReveal provider');

// Component: Script tag references the script file
assert(
    component.includes('import "../../scripts/scrollReveal.ts";'),
    'ScrollReveal component must import scrollReveal.ts'
);

// Component: Props interface
assert(component.includes('interface Props'), 'ScrollReveal must define Props interface');
assert(component.includes("class?: string"), 'Props must include optional class');
assert(component.includes("id?: string"), 'Props must include optional id');

// Component: slot and wrapper with scroll-reveal class
assert(component.includes('<slot />'), 'ScrollReveal must support slot content');
assert(component.includes('scroll-reveal'), 'ScrollReveal wrapper must use scroll-reveal class');

// Script: IntersectionObserver-based animation
assert(script.includes('IntersectionObserver'), 'scrollReveal.ts must use IntersectionObserver');
assert(script.includes('is-revealed'), 'Script must add is-revealed class on intersection');

// Script: Exports initScrollReveal function
assert(script.includes('export function initScrollReveal'), 'Script must export initScrollReveal');

// Script: Handles reduced-motion preference
assert(script.includes('prefers-reduced-motion'), 'Script must respect prefers-reduced-motion');
assert(script.includes("prefersReducedMotion"), 'Script must check for reduced motion');

// Script: Cleanup on re-init (prevents memory leaks)
assert(script.includes('currentObserver.disconnect()'), 'Script must disconnect previous observer on re-init');

// Script: Only targets unrevealed elements on re-init
assert(
    script.includes('.scroll-reveal:not(.is-revealed)'),
    'Script must skip already-revealed elements'
);

// Script: One-shot animation (unobserve after reveal)
assert(script.includes('unobserve(entry.target)'), 'Script must unobserve elements after reveal');

// Script: Observer configuration
assert(script.includes('rootMargin:'), 'Observer must configure rootMargin');
assert(script.includes('threshold: 0.1'), 'Observer must use 0.1 threshold');

// Script: DOMContentLoaded guard
assert(script.includes("document.readyState === 'loading'"), 'Script must check readyState');
assert(script.includes("DOMContentLoaded"), 'Script must listen for DOMContentLoaded');

console.log('E2E ScrollReveal checks passed.');
