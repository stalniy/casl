import sift from 'sift/sift.csp.min';
import { wrapArray } from './utils';

const REGEXP_SPECIAL_CHARS = /[-/\\^$+?.()|[\]{}]/g;
const REGEXP_ANY = /\.?\*+\.?/g;
const REGEXP_STARS = /\*+/;
const REGEXP_DOT = /\./g;

function detectRegexpPattern(match, index, string) {
  const quantifier = string[0] === '*' || match[0] === '.' && match[match.length - 1] === '.'
    ? '+'
    : '*';
  const matcher = match.indexOf('**') === -1 ? '[^.]' : '.';
  const pattern = match.replace(REGEXP_DOT, '\\$&')
    .replace(REGEXP_STARS, matcher + quantifier);

  return index + match.length === string.length ? `(?:${pattern})?` : pattern;
}

function escapeRegexp(match, index, string) {
  if (match === '.' && (string[index - 1] === '*' || string[index + 1] === '*')) {
    return match;
  }

  return `\\${match}`;
}

function createPattern(fields) {
  const patterns = fields.map(field => field
    .replace(REGEXP_SPECIAL_CHARS, escapeRegexp)
    .replace(REGEXP_ANY, detectRegexpPattern));
  const pattern = patterns.length > 1 ? `(?:${patterns.join('|')})` : patterns[0];

  return new RegExp(`^${pattern}$`);
}

export class Rule {
  constructor(params) {
    this.actions = params.actions || params.action;
    this.subject = params.subject;
    this.fields = !params.fields || params.fields.length === 0
      ? undefined
      : wrapArray(params.fields);
    Object.defineProperty(this, '_fieldsPattern', { writable: true });
    this.inverted = !!params.inverted;
    this.conditions = params.conditions;
    Object.defineProperty(this, '_matches', {
      writable: true,
      value: this.conditions ? sift(this.conditions) : undefined,
    });
    this.reason = params.reason;
  }

  matches(object) {
    if (!this._matches) {
      return true;
    }

    if (typeof object === 'string') {
      return !this.inverted;
    }

    return this._matches(object);
  }

  isRelevantFor(object, field) {
    if (!this.fields) {
      return true;
    }

    if (!field) {
      return !this.inverted;
    }

    return this.matchesField(field);
  }

  matchesField(field) {
    if (typeof this._fieldsPattern === 'undefined') {
      this._fieldsPattern = this.fields.join('').indexOf('*') === -1
        ? null
        : createPattern(this.fields);
    }

    if (this._fieldsPattern === null || field.indexOf('*') !== -1) {
      return this.fields.indexOf(field) !== -1;
    }

    return this._fieldsPattern.test(field);
  }
}
