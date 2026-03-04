// src/scripts/modal.ts

let modalBound = false;

export function initDiagnosticModal() {
  const dialog = document.getElementById('diagnostic-modal') as HTMLDialogElement | null;
  const closeBtn = document.getElementById('close-diagnostic-modal') as HTMLButtonElement | null;

  if (!dialog || !closeBtn || modalBound) return;
  modalBound = true;

  // Track the element that had focus before the modal opened.
  let previousActiveElement: HTMLElement | null = null;

  const focusableSelectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
  ].join(',');

  const trapFocus = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
    });

    if (!focusableElements.includes(closeBtn)) {
      focusableElements.unshift(closeBtn);
    }

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else if (document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  };

  const cleanupAfterClose = () => {
    dialog.removeEventListener('keydown', trapFocus);
    document.body.style.overflow = '';

    if (previousActiveElement) {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  };

  const openModal = () => {
    if (dialog.open) return;
    previousActiveElement = document.activeElement as HTMLElement | null;

    document.body.style.overflow = 'hidden';
    dialog.showModal();

    setTimeout(() => {
      closeBtn.focus();
    }, 10);

    dialog.addEventListener('keydown', trapFocus);
  };

  const closeModal = () => {
    if (dialog.open) {
      dialog.close();
      return;
    }

    cleanupAfterClose();
  };

  document.addEventListener('open-diagnostic', () => {
    openModal();
  });

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      closeModal();
    }
  });

  dialog.addEventListener('close', cleanupAfterClose);
}

// Single initialization logic to attach during router transitions
export function setupModalListener() {
  initDiagnosticModal();
}
