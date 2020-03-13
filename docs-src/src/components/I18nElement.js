import { LitElement } from 'lit-element';
import { listenForLangChanged } from '../services/i18n';

export default class I18nElement extends LitElement {
  constructor() {
    super();
    this._unwatchLang = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unwatchLang = listenForLangChanged(() => {
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
