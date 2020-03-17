const { normalize: normalizePath, dirname } = require('path');

function isExternalUrl(url) {
  return url.startsWith('https://') || url.startsWith('http://');
}

function isLocalUrl(url) {
  return url.startsWith('/') || url.startsWith('../') || url.startsWith('./');
}

function buildInAppLinkAttrs(token, ctx) {
  const attrs = token.attrs.slice(0);

  attrs[ctx.hrefIndex][0] = 'to';
  attrs[ctx.hrefIndex][1] = 'page';
  attrs.push(['params', JSON.stringify({ id: ctx.page })]);

  if (ctx.hash) {
    attrs.push(['hash', ctx.hash]);
  }

  return attrs;
}

function toCustomLink(token, hrefIndex, options, env) {
  let page = token.attrs[hrefIndex][1];
  const hashIndex = page.indexOf('#');
  let hash = null;

  if (hashIndex !== -1) {
    hash = page.slice(hashIndex + 1);
    page = page.slice(0, hashIndex);
  }

  if (page.startsWith('/')) {
    page = page.slice(1);
  } else {
    page = normalizePath(`${dirname(env.relativePath)}/${page}`);
  }

  const attrs = options.attrs || buildInAppLinkAttrs;

  return Object.create(token, {
    attrs: { value: attrs(token, { hrefIndex, page, hash }, env) },
    tag: { value: options.tagName }
  });
}

module.exports = (md, config = {}) => {
  let isInAppLink = false;
  const isInAppUrl = config.isInAppUrl || isLocalUrl;

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex('href');

    if (hrefIndex >= 0) {
      const hrefToken = token.attrs[hrefIndex];

      if (isExternalUrl(hrefToken[1])) {
        Object.keys(config.external).forEach((key) => {
          token.attrSet(key, config.external[key]);
        });
      } else if (isInAppUrl(hrefToken[1]) && config.local) {
        tokens[idx] = toCustomLink(token, hrefIndex, config.local, env);
        isInAppLink = true;
      }
    }
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (isInAppLink) {
      token.tag = config.local.tagName;
      isInAppLink = false;
    }
    return self.renderToken(tokens, idx, options);
  };
};
