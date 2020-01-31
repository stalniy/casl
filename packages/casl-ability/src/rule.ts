import './sift';
import sift, { Query as SiftQuery } from 'sift';
import { wrapArray } from './utils';
import { UnifiedRawRule, RawRule } from './RawRule';
import { AbilitySubject } from './types';

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

type ConditionsMatcher = (object: object) => boolean;

class Rule {
  private _fieldsPattern?: RegExp | null;

  private _matches?: ConditionsMatcher;

  constructor(params: RawRule) {
    this.actions = 'actions' in params ? params.actions : params.action;
    this.subject = params.subject;
    this.fields = !params.fields || params.fields.length === 0
      ? undefined
      : wrapArray(params.fields);
    Object.defineProperty(this, '_fieldsPattern', { writable: true });
    this.inverted = !!params.inverted;
    this.conditions = params.conditions;
    Object.defineProperty(this, '_matches', {
      writable: true,
      value: this.conditions ? sift(this.conditions as SiftQuery) : undefined,
    });
    this.reason = params.reason;
  }

  matches(object: AbilitySubject): boolean {
    if (!this._matches) {
      return true;
    }

    if (typeof object === 'string') {
      return !this.inverted;
    }

    return this._matches(object);
  }

  isRelevantFor(object: AbilitySubject, field?: string): boolean {
    if (!this.fields) {
      return true;
    }

    if (!field) {
      return !this.inverted;
    }

    return this._matchesField(this.fields, field);
  }

  _matchesField(fields: string[], field: string): boolean {
    if (typeof this._fieldsPattern === 'undefined') {
      this._fieldsPattern = fields.join('').indexOf('*') === -1
        ? null
        : createPattern(fields);
    }

    if (this._fieldsPattern === null || field.indexOf('*') !== -1) {
      return fields.indexOf(field) !== -1;
    }

    return this._fieldsPattern.test(field);
  }
}

interface Rule extends UnifiedRawRule {}

export default Rule;
