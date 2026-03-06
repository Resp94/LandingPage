import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const modalComponentPath = join(root, 'src/components/ui/DiagnosticModal.astro');
const modalScriptPath = join(root, 'src/scripts/modal.ts');
const indexPath = join(root, 'src/pages/index.astro');

assert(existsSync(modalComponentPath), 'Missing src/components/ui/DiagnosticModal.astro');
assert(existsSync(modalScriptPath), 'Missing src/scripts/modal.ts');
assert(existsSync(indexPath), 'Missing src/pages/index.astro');

const modalComponent = readFileSync(modalComponentPath, 'utf8');
const modalScript = readFileSync(modalScriptPath, 'utf8');
const indexContent = readFileSync(indexPath, 'utf8');

// AC1: Overlay / backdrop
assert(modalComponent.includes('<dialog'), 'Modal must use native <dialog>');
assert(
  modalComponent.includes('backdrop:bg-surface-primary/80'),
  'Modal backdrop must include backdrop:bg-surface-primary/80'
);
assert(modalComponent.includes('backdrop:backdrop-blur-xl'), 'Modal backdrop must include backdrop blur');

// AC2: centered panel + animation + reduced motion behavior
assert(modalComponent.includes('max-w-xl'), 'Modal panel must include max-w-xl');
assert(modalComponent.includes('mx-auto'), 'Modal panel must include mx-auto');
assert(modalComponent.includes('translate-y-2'), 'Modal must start with translate-y-2');
assert(modalComponent.includes('open:translate-y-0'), 'Modal must animate to translate-y-0');
assert(modalComponent.includes('open:opacity-100'), 'Modal must animate opacity to 100');
assert(modalComponent.includes('duration-300'), 'Modal transition must include duration-300');
assert(modalComponent.includes('ease-out'), 'Modal transition must include ease-out');
assert(modalComponent.includes('motion-reduce:transition-none'), 'Modal must disable transition on reduced motion');

// AC3: close button accessibility and styles
assert(modalComponent.includes('id="close-diagnostic-modal"'), 'Modal must include close button id');
assert(
  /aria-label="Fechar.*diagn[oó]stico"/i.test(modalComponent),
  'Close button must include the correct aria-label'
);
assert(modalComponent.includes('text-white/50'), 'Close button must include text-white/50');
assert(modalComponent.includes('hover:text-white/90'), 'Close button must include hover:text-white/90');

// AC4/AC5: script responsibilities and accessibility behavior
assert(modalComponent.includes('role="dialog"'), 'Modal must include role="dialog"');
assert(modalComponent.includes('aria-modal="true"'), 'Modal must include aria-modal="true"');
assert(modalComponent.includes('aria-labelledby="diagnostic-modal-title"'), 'Modal must include aria-labelledby');
assert(modalScript.includes("document.body.style.overflow = 'hidden'"), 'Modal script must lock body scroll on open');
assert(modalScript.includes("document.body.style.overflow = ''"), 'Modal script must unlock body scroll on close');
assert(modalScript.includes("document.addEventListener('open-diagnostic'"), 'Modal script must listen to open-diagnostic');
assert(modalScript.includes("dialog.addEventListener('keydown', trapFocus)"), 'Modal script must trap focus');
assert(modalScript.includes("dialog.addEventListener('close', cleanupAfterClose)"), 'Close event must run cleanup');
assert(modalScript.includes('let modalBound = false'), 'Modal setup must be idempotent');

// Architecture/lazy hydration equivalent to client:visible behavior
assert(modalComponent.includes('new IntersectionObserver'), 'Modal init must be lazy by viewport visibility');
assert(modalComponent.includes("await import('../../scripts/modal')"), 'Modal script must lazy-import modal.ts');

// Integration into the page
assert(indexContent.includes('import DiagnosticModal'), 'index.astro must import DiagnosticModal');
assert(indexContent.includes('<DiagnosticModal />'), 'index.astro must render DiagnosticModal');

console.log('Story 3.2 smoke checks passed.');
