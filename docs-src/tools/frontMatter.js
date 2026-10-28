export function extractFrontMatter(source) {
  const opening = /^\uFEFF?---[\t ]*(?:\r?\n|$)/.exec(source);

  if (!opening) {
    return { frontMatter: '', content: source };
  }

  const delimiter = /^---[\t ]*(?:\r?\n|$)/gm;
  delimiter.lastIndex = opening[0].length;
  const closing = delimiter.exec(source);

  if (!closing) {
    throw new Error('Missing closing front matter delimiter (---)');
  }

  return {
    frontMatter: source.slice(opening[0].length, closing.index),
    content: source.slice(delimiter.lastIndex),
  };
}
