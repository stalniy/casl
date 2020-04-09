const viewport = window.visualViewport || window;

export default function watchMedia(query, onUpdate) {
  const ql = window.matchMedia(query);
  const handler = () => onUpdate(ql.matches);

  viewport.addEventListener('resize', handler);
  handler();

  return () => viewport.removeEventListener('resize', handler);
}
