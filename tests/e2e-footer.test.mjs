import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const footerPath = join(root, 'src/components/layout/Footer.astro');
const baseLayoutPath = join(root, 'src/layouts/BaseLayout.astro');

assert(existsSync(footerPath), 'Missing src/components/layout/Footer.astro');
assert(existsSync(baseLayoutPath), 'Missing src/layouts/BaseLayout.astro');

const footer = readFileSync(footerPath, 'utf8');
const baseLayout = readFileSync(baseLayoutPath, 'utf8');

// Integration: Footer imported and rendered in BaseLayout
assert(baseLayout.includes('import Footer'), 'BaseLayout must import Footer');
assert(baseLayout.includes('<Footer />'), 'BaseLayout must render Footer');

// Semantic structure: uses <footer> element
assert(footer.includes('<footer'), 'Footer must use <footer> element');

// Border and styling
assert(footer.includes('border-t'), 'Footer must have a top border');
assert(footer.includes('border-[var(--color-grid-subtle)]'), 'Footer border must be subtle');
assert(footer.includes('bg-surface-primary'), 'Footer must have dark background');
assert(
  footer.includes('text-[var(--color-text-meta)]'),
  'Footer text must use V2 meta token'
);

// Copyright text with dynamic year
assert(footer.includes('currentYear'), 'Footer must use dynamic year');
assert(footer.includes('Aptus. Todos os direitos reservados'), 'Footer must include copyright text');

// Dynamic contact link
assert(
  footer.includes('href={`mailto:${settings.contact_email}`}'),
  'Footer must use dynamic contact mailto link'
);
assert(footer.includes('aria-label="E-mail de Contato"'), 'Contact link must have aria-label');

// Privacy link
assert(footer.includes('href="/privacidade"'), 'Footer must link to privacy page');
assert(footer.includes('Privacidade'), 'Privacy link must have aria-label');

// Dynamic social media links
assert(footer.includes('href={settings.linkedin_url}'), 'Footer must include dynamic LinkedIn link');
assert(footer.includes('href={settings.instagram_url}'), 'Footer must include dynamic Instagram link');
assert(footer.includes('target="_blank"'), 'Social links must open in new tab');
assert(
  footer.includes('rel="noopener noreferrer"'),
  'Social links must include security rel attributes'
);
assert(footer.includes('aria-label="Aptus no LinkedIn"'), 'LinkedIn link must have aria-label');
assert(footer.includes('aria-label="Aptus no Instagram"'), 'Instagram link must have aria-label');

// Accessibility: focus-visible styles on all links
const linkMatches = footer.match(/focus-visible:ring-2/g);
assert(
  linkMatches && linkMatches.length >= 4,
  'All interactive links must have focus-visible ring states'
);

// Social icons are decorative
assert(footer.includes('aria-hidden="true"'), 'Social SVG icons must be aria-hidden');

// Responsive layout
assert(/flex[^"\n]*flex-col[^"\n]*md:flex-row/.test(footer), 'Footer layout must be responsive');

// Hover states
assert(
  footer.includes('hover:text-[var(--color-text-primary)]'),
  'Links must lighten on hover with V2 primary token'
);

// No client-side scripts
assert(!footer.includes('<script'), 'Footer must not contain inline scripts');

console.log('E2E Footer checks passed.');
