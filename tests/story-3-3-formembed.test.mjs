import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const formEmbedPath = join(root, 'src/components/ui/FormEmbed.astro');
const diagnosticModalPath = join(root, 'src/components/ui/DiagnosticModal.astro');
const envExamplePath = join(root, '.env.example');
const envTypesPath = join(root, 'src/env.d.ts');

assert(existsSync(formEmbedPath), 'Missing src/components/ui/FormEmbed.astro');
assert(existsSync(diagnosticModalPath), 'Missing src/components/ui/DiagnosticModal.astro');
assert(existsSync(envExamplePath), 'Missing .env.example');
assert(existsSync(envTypesPath), 'Missing src/env.d.ts');

const formEmbed = readFileSync(formEmbedPath, 'utf8');
const diagnosticModal = readFileSync(diagnosticModalPath, 'utf8');
const envExample = readFileSync(envExamplePath, 'utf8');
const envTypes = readFileSync(envTypesPath, 'utf8');

// AC1: Lazy-loaded when modal is opened via MutationObserver
assert(formEmbed.includes('MutationObserver'), 'FormEmbed must observe modal open attribute');

// AC2: Skeleton placeholder
assert(formEmbed.includes('animate-pulse'), 'FormEmbed must include a skeleton');
assert(formEmbed.includes('bg-surface-tertiary'), 'Skeleton must use bg-surface-tertiary');

// AC3: Responsive iframe
assert(formEmbed.includes('createElement(\'iframe\')'), 'FormEmbed must inject an iframe element');
assert(formEmbed.includes('w-full') && formEmbed.includes('min-h-[400px]'), 'FormEmbed wrapper must fill container space');
assert(formEmbed.includes('iframe.referrerPolicy = \'strict-origin-when-cross-origin\''), 'Form iframe must set referrerPolicy');
assert(formEmbed.includes('iframe.sandbox = \'allow-forms allow-scripts allow-same-origin allow-popups\''), 'Form iframe must set sandbox restrictions');

// AC4: Env var TYPEFORM_FORM_ID
assert(envExample.includes('TYPEFORM_FORM_ID='), '.env.example must include TYPEFORM_FORM_ID=');
assert(formEmbed.includes('TYPEFORM_FORM_ID'), 'FormEmbed must use TYPEFORM_FORM_ID from env');
assert(envTypes.includes('TYPEFORM_FORM_ID'), 'src/env.d.ts must type TYPEFORM_FORM_ID');

// AC6: Silent failure CTA / noscript
assert(formEmbed.includes('<noscript>'), 'FormEmbed must include noscript block');
assert(formEmbed.includes('mailto:'), 'FormEmbed must include the fallback mailto link');
assert(formEmbed.includes('const fallbackTimer = setTimeout'), 'FormEmbed must include silent-failure timeout guard');
assert(
  /setTimeout\(\(\)\s*=>\s*{[\s\S]*showFallback\(\);[\s\S]*},\s*silentFailureTimeoutMs\);/.test(formEmbed),
  'FormEmbed must show fallback when iframe load silently times out'
);

// DiagnosticModal Integration
assert(diagnosticModal.includes("import FormEmbed"), 'DiagnosticModal must import FormEmbed');
assert(diagnosticModal.includes("<FormEmbed"), 'DiagnosticModal must render FormEmbed');

console.log('Story 3.3 smoke checks passed.');
