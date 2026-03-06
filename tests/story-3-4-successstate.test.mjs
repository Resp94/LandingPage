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

assert(modalComponent.includes('id="form-view"'), 'DiagnosticModal must include #form-view');
assert(modalComponent.includes('id="success-view"'), 'DiagnosticModal must include #success-view');
assert(modalScript.includes('showSuccessState()'), 'modal.ts must transition to success state');

assert(modalComponent.includes('Analisando seu ecossistema...'), 'Success title must match copy');
assert(
  modalComponent.includes('Seu perfil foi enviado ao nucleo de Engenharia Aptus') &&
    modalComponent.includes('24h'),
  'Success supporting text must match copy intent'
);
assert(
  modalComponent.includes('text-[var(--color-text-primary)]'),
  'Primary success copy must use V2 primary text token'
);
assert(
  modalComponent.includes('text-[var(--color-text-secondary)]'),
  'Supporting success copy must use V2 secondary text token'
);
assert(modalComponent.includes('text-accent'), 'Success view must include accent checkmark');

assert(!/confetti|fireworks?|obrigado/i.test(modalComponent), 'Success state must avoid generic celebratory messaging');

assert(modalComponent.includes('id="success-close-btn"'), 'Success view must include close button');
assert(modalComponent.includes('bg-transparent'), 'Success close button must be ghost-style (transparent background)');
assert(modalComponent.includes('hover:bg-surface-secondary'), 'Success close button must use token-based hover background');

assert(modalComponent.includes('role="status"'), 'Success wrapper must include role="status"');
assert(modalComponent.includes('aria-live="polite"'), 'Success wrapper must include aria-live="polite"');

assert(modalScript.includes('event.origin !== iframeOrigin'), 'postMessage handler must validate origin');
assert(modalScript.includes('event.source !== iframe.contentWindow'), 'postMessage handler must validate source window');
assert(
  modalComponent.includes("document.addEventListener('open-diagnostic', ensureInitOnFirstOpen, { capture: true });"),
  'DiagnosticModal must bootstrap initialization on first open-diagnostic event'
);

console.log('Story 3.4 smoke checks passed.');
