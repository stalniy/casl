import { translate, translateUnsafeHTML } from 'lit-translate';
import { d as formatDate } from '../services/i18n.js';

export const d = formatDate;

export const t = translate;

export const ut = translateUnsafeHTML;
