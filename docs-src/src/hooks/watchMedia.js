const viewport = window.visualViewport || window;

export default function watchMedia(query, onUpdate) {
  const ql = window.matchMedia(query);
  const notify = () => onUpdate(ql.matches);

  viewport.addEventListener('resize', notify);
  notify();

  return () => viewport.removeEventListener('resize', notify);
}
