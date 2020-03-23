const { basename, dirname } = require('path');
const getImageSize = require('image-size');

function replaceLocalSrcWithUrl(src, options) {
  const root = options.srcRoot || '/images';
  return `${root}/${basename(src)}`;
}

module.exports = function image(md, options = {}) {
  const normalizeSrc = options.normalizeSrc || replaceLocalSrcWithUrl;
  const renderImage = md.renderer.rules.image;

  md.renderer.rules.image = (tokens, idx, params, env, self) => {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    const srcAttr = token.attrs[srcIndex];

    if (srcAttr && srcAttr[1][0] === '.') {
      if (options.size === 'auto' && env.file) {
        const imagePath = `${dirname(env.file.path)}/${srcAttr[1]}`;
        const size = getImageSize(imagePath);

        token.attrSet('width', size.width);
        token.attrSet('height', size.height);
      }

      srcAttr[1] = normalizeSrc(srcAttr[1], options);
    }

    return renderImage(tokens, idx, params, env, self);
  };
};
