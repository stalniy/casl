import { LitElement } from 'lit-element';
import { listenForLangChanged, locale } from '../services/i18n';

export default class I18nElement extends LitElement {
  constructor() {
    super();
    this._unwatchLang = null;
    this._locale = locale();
  }

  connectedCallback() {
    super.connectedCallback();
    this._unwatchLang = listenForLangChanged((lang) => {
      this._locale = lang;
      this.reload().then(() => this.requestUpdate());
    });
  }

  disconnectedCallback() {
    this._unwatchLang();
    super.disconnectedCallback();
  }

  reload() {
    return Promise.reject(new Error(
      `${this.constructor.cName} should implement "reload" method`
    ));
  }
}
