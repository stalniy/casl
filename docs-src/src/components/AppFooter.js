import { LitElement, html, css } from 'lit-element';
import { t, ut } from '../directives/i18n.js';
import { openAnalyticsPreferences } from '../services/analytics.js';
import { mdCss } from '../styles/index.js';

export default class Footer extends LitElement {
  static cName = 'app-footer';

  year = new Date().getFullYear();

  render() {
    return html`
      <p class="copyright md">${ut('copyright', { year: this.year })}</p>
      <p><button type="button" @click="${openAnalyticsPreferences}">${t('analyticsConsent.settings')}</button></p>
    `;
  }
}

Footer.styles = [
  mdCss,
  css`
    :host {
      --app-footer-background: #838385;
      --app-footer-text-color: #fff;
      --app-footer-text-size: 13px;

      display: block;
      padding: 40px 0;
      background-color: #303846;
      font-size: var(--app-footer-text-size);
      text-align: center;
      color: var(--app-footer-text-color);
    }

    .copyright {
      white-space: pre-line;
    }

    button {
      background: transparent;
      border: 0;
      padding: 8px;
      color: inherit;
      font: inherit;
      text-decoration: underline;
      cursor: pointer;
    }

    button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `,
];
