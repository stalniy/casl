import { FieldMatcher } from '../Rule';

const REGEXP_SPECIAL_CHARS = /[-/\\^$+?.()|[\]{}]/g;
const REGEXP_ANY = /\.?\*+\.?/g;
const REGEXP_STARS = /\*+/;
const REGEXP_DOT = /\./g;

function detectRegexpPattern(match: string, index: number, string: string): string {
  const quantifier = string[0] === '*' || match[0] === '.' && match[match.length - 1] === '.'
    ? '+'
    : '*';
  const matcher = match.indexOf('**') === -1 ? '[^.]' : '.';
  const pattern = match.replace(REGEXP_DOT, '\\$&')
    .replace(REGEXP_STARS, matcher + quantifier);

  return index + match.length === string.length ? `(?:${pattern})?` : pattern;
}

function escapeRegexp(match: string, index: number, string: string): string {
  if (match === '.' && (string[index - 1] === '*' || string[index + 1] === '*')) {
    return match;
  }

  return `\\${match}`;
}

function createPattern(fields: string[]) {
  const patterns = fields.map(field => field
    .replace(REGEXP_SPECIAL_CHARS, escapeRegexp)
    .replace(REGEXP_ANY, detectRegexpPattern));
  const pattern = patterns.length > 1 ? `(?:${patterns.join('|')})` : patterns[0];

  return new RegExp(`^${pattern}$`);
}

export const fieldMatcher: FieldMatcher = fields => field => fields.indexOf(field) !== -1;

export const fieldPatternMatcher: FieldMatcher = (fields) => {
  let pattern: RegExp | null;

  return (field) => {
    if (typeof pattern === 'undefined') {
      pattern = fields.join('').indexOf('*') === -1
        ? null
        : createPattern(fields);
    }

    if (pattern === null || field.indexOf('*') !== -1) {
      return fields.indexOf(field) !== -1;
    }

    return pattern.test(field);
  };
};
