/**
 * Focus trap for modal surfaces (drawers, overlays, modals).
 *
 * Keyboard users must not be able to tab out of an open overlay into the page
 * behind it, and focus has to return to the trigger when the overlay closes.
 */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

interface TrapOptions {
  onEscape?: () => void;
}

export function trapFocus(container: HTMLElement, options: TrapOptions = {}): () => void {
  const previouslyFocused = document.activeElement as HTMLElement | null;

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      options.onEscape?.();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getFocusable(container);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // Move focus into the overlay so the next Tab lands inside it.
  const initial = getFocusable(container)[0] ?? container;
  initial.focus();

  document.addEventListener('keydown', handleKeydown);

  return function release() {
    document.removeEventListener('keydown', handleKeydown);
    previouslyFocused?.focus?.();
  };
}
