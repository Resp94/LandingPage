// src/scripts/modal.ts

let modalBound = false;

export function initDiagnosticModal() {
  const dialog = document.getElementById('diagnostic-modal') as HTMLDialogElement | null;
  const closeBtn = document.getElementById('close-diagnostic-modal') as HTMLButtonElement | null;

  if (!dialog || !closeBtn || modalBound) return;
  modalBound = true;

  // Track the element that had focus before the modal opened.
  let previousActiveElement: HTMLElement | null = null;
  let successStateVisible = false;
  let successTransitionTimer: number | null = null;

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
    if (successTransitionTimer !== null) {
      window.clearTimeout(successTransitionTimer);
      successTransitionTimer = null;
    }

    if (previousActiveElement) {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  };

  const openModal = () => {
    if (dialog.open) return;
    previousActiveElement = document.activeElement as HTMLElement | null;

    // Reset view states for diagnostic modal
    const formView = document.getElementById('form-view');
    const successView = document.getElementById('success-view');
    if (formView && successView) {
      formView.classList.remove('hidden', 'opacity-0');
      formView.classList.add('opacity-100');
      successView.classList.add('hidden', 'opacity-0');
      successView.classList.remove('opacity-100', 'pointer-events-none');
      successStateVisible = false;
    }

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

  const successCloseBtn = document.getElementById('success-close-btn');
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  const showSuccessState = () => {
    if (successStateVisible) return;

    const formView = document.getElementById('form-view');
    const successView = document.getElementById('success-view');

    if (formView && successView) {
      successStateVisible = true;
      formView.classList.remove('opacity-100');
      formView.classList.add('opacity-0');

      if (successTransitionTimer !== null) {
        window.clearTimeout(successTransitionTimer);
        successTransitionTimer = null;
      }

      successTransitionTimer = window.setTimeout(() => {
        formView.classList.add('hidden');
        successView.classList.remove('hidden');

        // trigger reflow
        void successView.offsetWidth;

        successView.classList.remove('opacity-0');
        successView.classList.add('opacity-100');

        if (successCloseBtn) {
          successCloseBtn.focus();
        }
      }, 300);
    }
  };

  const isFormSubmitPayload = (payload: unknown): boolean => {
    if (typeof payload === 'string') {
      if (payload.includes('Tally.FormSubmitted') || payload.includes('form-submit')) {
        return true;
      }

      try {
        const parsedPayload: unknown = JSON.parse(payload);
        return isFormSubmitPayload(parsedPayload);
      } catch {
        return false;
      }
    }

    if (typeof payload !== 'object' || payload === null) {
      return false;
    }

    const record = payload as Record<string, unknown>;
    return (
      record.event === 'Tally.FormSubmitted' ||
      record.type === 'form-submit' ||
      record.type === 'Tally.FormSubmitted'
    );
  };

  const isTrustedEmbedMessage = (event: MessageEvent): boolean => {
    const iframe = dialog.querySelector<HTMLIFrameElement>('#form-view iframe');
    if (!iframe?.src) return false;

    let iframeOrigin = '';
    try {
      iframeOrigin = new URL(iframe.src, window.location.href).origin;
    } catch {
      return false;
    }

    if (event.origin !== iframeOrigin) return false;
    if (iframe.contentWindow && event.source !== iframe.contentWindow) return false;
    return true;
  };

  window.addEventListener('message', (event) => {
    if (!dialog.open) return;
    if (!isTrustedEmbedMessage(event)) return;

    if (isFormSubmitPayload(event.data)) {
      showSuccessState();
    }
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
