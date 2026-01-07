module.exports = (md, config = {}) => {
  const cssClass = config.cssClass || 'responsive';

  md.renderer.rules.table_open = (tokens, idx, options, env, self) => `<div class="${cssClass}">${self.renderToken(tokens, idx, options)}`;

  md.renderer.rules.table_close = (tokens, idx, options, env, self) => `${self.renderToken(tokens, idx, options)}</div>`;
};
