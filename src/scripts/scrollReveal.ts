/**
 * ScrollReveal — IntersectionObserver-based scroll animations
 *
 * Uses native IntersectionObserver API to detect `.scroll-reveal` elements
 * entering the viewport and applies `.is-revealed` class to trigger CSS transitions.
 *
 * Handles:
 * - Reduced motion preference (reveals instantly)
 * - Observer cleanup on re-initialization (prevents memory leaks)
 * - Already-revealed elements are skipped on re-init
 */

let currentObserver: IntersectionObserver | null = null;

export function initScrollReveal(): void {
    // Disconnect any existing observer to prevent duplicate instances
    if (currentObserver) {
        currentObserver.disconnect();
        currentObserver = null;
    }

    // Check for reduced motion preference early
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches;

    // Select only elements NOT yet revealed (skip already-animated elements on re-init)
    const elements = document.querySelectorAll(
        '.scroll-reveal:not(.is-revealed)',
    );

    if (elements.length === 0) return;

    // If reduced motion is preferred, reveal all immediately
    if (prefersReducedMotion) {
        elements.forEach((el) => el.classList.add('is-revealed'));
        return;
    }

    // Create a single IntersectionObserver instance
    currentObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add the 'is-revealed' class to trigger CSS transition
                    entry.target.classList.add('is-revealed');
                    // Stop observing this element (one-shot animation for performance)
                    currentObserver?.unobserve(entry.target);
                }
            });
        },
        {
            root: null, // viewport
            rootMargin: '0px 0px -50px 0px', // trigger slightly before full entry
            threshold: 0.1, // 10% of the element needs to be visible
        },
    );

    // Start observing all unrevealed elements
    elements.forEach((element) => {
        currentObserver!.observe(element);
    });
}

// Initialize when the DOM is ready.
// Using DOMContentLoaded guard for initial load. If the project later adopts
// Astro's <ClientRouter /> for View Transitions, replace this block with a
// single `document.addEventListener('astro:page-load', initScrollReveal);`
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
    initScrollReveal();
}
