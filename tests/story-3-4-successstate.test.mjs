import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const modalComponentPath = join(root, 'src/components/ui/DiagnosticModal.astro');
const modalScriptPath = join(root, 'src/scripts/modal.ts');

assert(existsSync(modalComponentPath), 'Missing src/components/ui/DiagnosticModal.astro');
assert(existsSync(modalScriptPath), 'Missing src/scripts/modal.ts');

const modalComponent = readFileSync(modalComponentPath, 'utf8');
const modalScript = readFileSync(modalScriptPath, 'utf8');

// AC1: success state inside DiagnosticModal without redirect
assert(modalComponent.includes('id="form-view"'), 'DiagnosticModal must include #form-view');
assert(modalComponent.includes('id="success-view"'), 'DiagnosticModal must include #success-view');
assert(modalScript.includes('showSuccessState()'), 'modal.ts must transition to success state');

// AC2/AC3/AC4: rich success content and styling requirements
assert(modalComponent.includes('Analisando seu ecossistema...'), 'Success title must match copy');
assert(
  modalComponent.includes('Seu perfil foi enviado ao núcleo de Engenharia Aptus. Tempo de resposta projetado: 24h úteis.'),
  'Success supporting text must match copy'
);
assert(modalComponent.includes('text-zinc-100'), 'Primary success copy must use text-zinc-100');
assert(modalComponent.includes('text-zinc-400'), 'Supporting success copy must use text-zinc-400');
assert(modalComponent.includes('text-emerald-500'), 'Success view must include emerald checkmark accent');

// AC5: avoid generic celebratory messaging
assert(!/confetti|fireworks?|obrigado/i.test(modalComponent), 'Success state must avoid generic celebratory messaging');

// AC6: ghost-style close action
assert(modalComponent.includes('id="success-close-btn"'), 'Success view must include close button');
assert(modalComponent.includes('bg-transparent'), 'Success close button must be ghost-style (transparent background)');
assert(modalComponent.includes('hover:bg-zinc-900'), 'Success close button must have ghost hover background');

// AC7: accessibility attributes
assert(modalComponent.includes('role="status"'), 'Success wrapper must include role="status"');
assert(modalComponent.includes('aria-live="polite"'), 'Success wrapper must include aria-live="polite"');

// Security/reliability follow-ups from review
assert(modalScript.includes('event.origin !== iframeOrigin'), 'postMessage handler must validate origin');
assert(modalScript.includes('event.source !== iframe.contentWindow'), 'postMessage handler must validate source window');
assert(
  modalComponent.includes("document.addEventListener('open-diagnostic', ensureInitOnFirstOpen, { capture: true })"),
  'DiagnosticModal must bootstrap initialization on first open-diagnostic event'
);

console.log('Story 3.4 smoke checks passed.');
