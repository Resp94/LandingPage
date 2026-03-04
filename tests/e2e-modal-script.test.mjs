import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

const root = process.cwd();
const modalScriptPath = join(root, 'src/scripts/modal.ts');

assert(existsSync(modalScriptPath), 'Missing src/scripts/modal.ts');

const modal = readFileSync(modalScriptPath, 'utf8');

// Exports: setupModalListener and initDiagnosticModal
assert(modal.includes('export function initDiagnosticModal'), 'Must export initDiagnosticModal');
assert(modal.includes('export function setupModalListener'), 'Must export setupModalListener');

// Idempotency guard
assert(modal.includes('let modalBound = false'), 'Must guard against double-bind with modalBound flag');
assert(modal.includes('if (!dialog || !closeBtn || modalBound) return'), 'Must return early if already bound');

// Focus trap implementation
assert(modal.includes('const trapFocus'), 'Must implement trapFocus function');
assert(modal.includes("e.key !== 'Tab'"), 'Focus trap must check for Tab key');
assert(modal.includes('e.shiftKey'), 'Focus trap must handle Shift+Tab');
assert(modal.includes('e.preventDefault()'), 'Focus trap must prevent default tab at boundaries');

// Focusable selectors include all interactive elements
assert(modal.includes("a[href]"), 'Focusable selectors must include links');
assert(modal.includes("button:not([disabled])"), 'Focusable selectors must include enabled buttons');
assert(modal.includes("iframe"), 'Focusable selectors must include iframes');
assert(modal.includes('[tabindex]:not([tabindex^="-"])'), 'Focusable selectors must include positive tabindex');

// Open modal flow
assert(modal.includes('const openModal'), 'Must define openModal function');
assert(modal.includes('dialog.showModal()'), 'Must use native showModal()');
assert(modal.includes("document.body.style.overflow = 'hidden'"), 'Must lock body scroll on open');
assert(modal.includes('previousActiveElement = document.activeElement'), 'Must store previous focus target');
assert(modal.includes('closeBtn.focus()'), 'Must focus close button on open');

// Close modal flow
assert(modal.includes('const closeModal'), 'Must define closeModal function');
assert(modal.includes('dialog.close()'), 'Must use native dialog.close()');

// Cleanup after close
assert(modal.includes('const cleanupAfterClose'), 'Must define cleanup function');
assert(modal.includes("document.body.style.overflow = ''"), 'Must restore body scroll on close');
assert(modal.includes('previousActiveElement.focus()'), 'Must restore focus to original element');
assert(modal.includes("dialog.addEventListener('close', cleanupAfterClose)"), 'Must attach cleanup to dialog close event');

// View state management (form → success)
assert(modal.includes("getElementById('form-view')"), 'Must reference form-view element');
assert(modal.includes("getElementById('success-view')"), 'Must reference success-view element');
assert(modal.includes('const showSuccessState'), 'Must define showSuccessState function');
assert(modal.includes('let successStateVisible = false'), 'Must track success state visibility');

// Success state transition with opacity animation
assert(modal.includes("formView.classList.add('opacity-0')"), 'Must fade out form view');
assert(modal.includes("successView.classList.remove('opacity-0')"), 'Must fade in success view');
assert(modal.includes("successView.classList.add('opacity-100')"), 'Must set success view to full opacity');

// Success close button
assert(modal.includes("getElementById('success-close-btn')"), 'Must reference success close button');

// PostMessage handler for form submission detection
assert(modal.includes("window.addEventListener('message'"), 'Must listen for postMessage events');
assert(modal.includes('isFormSubmitPayload'), 'Must implement form submit payload detection');
assert(modal.includes('isTrustedEmbedMessage'), 'Must implement origin validation');

// Form submit payload detection — Tally integration
assert(modal.includes('Tally.FormSubmitted'), 'Must detect Tally.FormSubmitted event');
assert(modal.includes("record.type === 'form-submit'"), 'Must detect generic form-submit type');

// Security: origin and source validation
assert(modal.includes('event.origin !== iframeOrigin'), 'Must validate postMessage origin');
assert(modal.includes('event.source !== iframe.contentWindow'), 'Must validate postMessage source window');
assert(modal.includes("new URL(iframe.src, window.location.href).origin"), 'Must parse iframe origin from src');

// Backdrop click-to-close
assert(modal.includes("dialog.addEventListener('click'"), 'Must handle backdrop clicks');
assert(modal.includes('getBoundingClientRect()'), 'Must check click is outside dialog rect');

// Open event listener
assert(modal.includes("document.addEventListener('open-diagnostic'"), 'Must listen for open-diagnostic event');

// Timer cleanup to prevent memory leaks
assert(modal.includes('let successTransitionTimer'), 'Must track transition timer');
assert(modal.includes('window.clearTimeout(successTransitionTimer)'), 'Must clear timer on cleanup');

console.log('E2E modal.ts script checks passed.');
