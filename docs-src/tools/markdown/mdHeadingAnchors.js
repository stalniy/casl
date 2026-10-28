// Keep the existing heading IDs and link markup without relying on the
// removed markdown-it utils.assign API used by markdown-it-headinganchor.
export default function mdHeadingAnchors(md, { anchorClass, slugify }) {
  md.core.ruler.push('heading_anchors', (state) => {
    for (let i = 0; i < state.tokens.length - 1; i++) {
      const heading = state.tokens[i];
      const inline = state.tokens[i + 1];

      if (heading.type !== 'heading_open' || inline.type !== 'inline' || !inline.content) {
        continue;
      }

      const id = slugify(inline.content);
      heading.attrSet('id', id);

      const anchor = new state.Token('html_inline', '', 0);
      anchor.content = `<a name="${md.utils.escapeHtml(id)}" class="${md.utils.escapeHtml(anchorClass)}" href="#"></a>`;
      inline.children.unshift(anchor);
      i += 2;
    }
  });
}
