export default function watchMedia(query, onUpdate) {
  const ql = window.matchMedia(query);
  ql.onchange = event => onUpdate(event.matches);
  onUpdate(ql.matches);
  return () => ql.onchange = null;
}
