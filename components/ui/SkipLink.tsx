/**
 * Keyboard-only "skip to main content" link.
 *
 * Visually hidden until focused — first thing keyboard users hit
 * when they Tab into the page. Lets them bypass the navbar and
 * jump straight to the content. Required for AA accessibility.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-elevated transition-transform duration-200 ease-out-quint focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      Saltar al contenido
    </a>
  );
}
