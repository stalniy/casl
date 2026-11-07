import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n.js';
import {
  analyticsConsent, observeAnalyticsConsent, setAnalyticsConsent,
} from '../services/analytics.js';

export default class AnalyticsConsent extends LitElement {
  static cName = 'analytics-consent';
  static properties = { _open: { state: true } };

  constructor() {
    super();
    this._open = analyticsConsent() === null;
    this._show = () => {
      this._returnFocus = document.activeElement;
      while (this._returnFocus?.shadowRoot?.activeElement) {
        this._returnFocus = this._returnFocus.shadowRoot.activeElement;
      }
      this._open = true;
      this.updateComplete.then(() => this.shadowRoot.querySelector('button')?.focus());
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._unobserve = observeAnalyticsConsent(choice => { this._open = choice === null; });
    window.addEventListener('analytics-preferences', this._show);
  }

  disconnectedCallback() {
    this._unobserve();
    window.removeEventListener('analytics-preferences', this._show);
    super.disconnectedCallback();
  }

  _choose(choice) {
    setAnalyticsConsent(choice);
    this._returnFocus?.focus();
  }

  render() {
    if (!this._open) return html``;
    return html`
      <section role="region" aria-labelledby="consent-title">
        <div>
          <h2 id="consent-title">${t('analyticsConsent.title')}</h2>
          <p>${t('analyticsConsent.description')} <app-link to="privacy">${t('menu.privacy')}</app-link></p>
        </div>
        <div class="actions">
          <button type="button" @click="${() => this._choose('rejected')}">${t('analyticsConsent.reject')}</button>
          <button type="button" @click="${() => this._choose('accepted')}">${t('analyticsConsent.accept')}</button>
        </div>
      </section>
    `;
  }
}

AnalyticsConsent.styles = css`
  :host { position: fixed; bottom: 16px; left: 16px; right: 16px; z-index: 100; }
  section { display: flex; align-items: center; gap: 24px; max-width: 1000px; margin: auto; padding: 20px; border: 1px solid #bdccd6; border-radius: 12px; background: #fff; color: #202428; box-shadow: 0 4px 24px #0003; }
  h2 { font-size: 1.1rem; margin: 0 0 8px; }
  p { margin: 0; line-height: 1.5; }
  app-link { color: #175d82; text-decoration: underline; }
  .actions { display: flex; gap: 12px; flex-shrink: 0; }
  button { padding: 12px 16px; border: 1px solid #175d82; border-radius: 6px; background: #fff; color: #175d82; font: inherit; cursor: pointer; }
  button:hover { background: #eff4f7; }
  button:focus-visible { outline: 3px solid #175d82; outline-offset: 3px; }
  @media (max-width: 767px) {
    section { flex-direction: column; align-items: stretch; gap: 16px; padding: 16px; max-height: calc(100dvh - 64px); overflow: auto; }
    .actions { flex-wrap: wrap; }
    button { flex: 1; }
  }
`;
