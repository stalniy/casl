import slugify from '@sindresorhus/slugify';
import mdHighlights from 'markdown-it-highlightjs';
import mdInclude from 'markdown-it-include';
import { resolve } from 'path';
import { getOrCreateMdParser, parse } from 'xyaml-webpack-loader/parser';
import { extractFrontMatter } from './frontMatter.js';
import mdHeadingAnchors from './markdown/mdHeadingAnchors.js';
import mdImage from './markdown/mdImage.js';
import mdLink from './markdown/mdLink.js';
import mdTableContainer from './markdown/mdTableContainer.js';

export const markdownOptions = {
  use: [
    [mdHighlights, {}],
    [mdHeadingAnchors, {
      anchorClass: 'h-link',
      slugify,
    }],
    [mdInclude, {
      root: resolve(import.meta.dirname, '..', '..'),
      bracesAreOptional: true,
      includeRe: /@include:(\s+[\w._/-]+)/
    }],
    [mdLink, {
      external: {
        target: '_blank',
        rel: 'noopener nofollow'
      },
      local: {
        tagName: 'app-link'
      }
    }],
    [mdImage, {
      size: 'auto',
      srcRoot: `${process.env.LIT_APP_PUBLIC_PATH || ''}/images`
    }],
    [mdTableContainer, {}]
  ]
};

const xyamlOptions = { markdown: markdownOptions };

export const parsexYaml = content => parse(content, xyamlOptions);

export function parseFrontMatter(source, context) {
  const file = extractFrontMatter(source);
  const parser = getOrCreateMdParser(markdownOptions);
  const content = parser.render(file.content, context).trim();
  const headings = content.match(/<h(\d)[^>]*>(?:.+?)<\/h\1>/g) || [];

  return {
    ...(file.frontMatter ? parsexYaml(file.frontMatter) : {}),
    content,
    headings: headings.map((h) => {
      const idIndex = h.indexOf(' id="');
      const id = idIndex === -1 ? null : h.slice(idIndex + 5, h.indexOf('"', idIndex + 6));

      return {
        id,
        title: h.replace(/<[^>]+>/g, ' ').trim(),
      };
    }),
  };
}
