import { parse, getOrCreateMdParser } from 'xyaml-webpack-loader/parser';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';

export const markdownOptions = {
  use: {
    'markdown-it-highlightjs': {},
    'markdown-it-headinganchor': {
      anchorClass: 'h-link',
      slugify,
    }
  }
};

const xyamlOptions = { markdown: markdownOptions };

export const parsexYaml = content => parse(content, xyamlOptions);

const grayMatterOptions = {
  language: 'xyaml',
  engines: { xyaml: parsexYaml }
};

export function parseFrontMatter(content) {
  const file = matter(content, grayMatterOptions);
  const parser = getOrCreateMdParser(markdownOptions);

  return {
    ...file.data,
    content: parser.render(file.content).trim(),
  };
}
