import { directive } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { langChanged, get, translate } from 'lit-translate';
import { d as formatDate } from '../services/i18n';

export const d = directive((date, format) => (part) => {
  const value = formatDate(date, format);

  if (part.value !== value) {
    part.setValue(value);
  }
});

export const t = translate;

export const ut = directive((key, values) => langChanged(() => unsafeHTML(get(key, values))));
