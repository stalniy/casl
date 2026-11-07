import { LitElement, html, css } from 'lit-element';
import { btnCss } from '../styles/index.js';
import { t } from '../directives/i18n.js';

const formId = import.meta.env.TALLY_FORM_ID;

export default class ConsultingCta extends LitElement {
  static cName = 'consulting-cta';

  connectedCallback() {
    super.connectedCallback();
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  _openInquiry(event) {
    window.umami?.track('consulting_cta_click', {
      cta_location: this.getAttribute('location'),
    });
    if (!window.Tally?.openPopup) return;
    event.preventDefault();
    window.Tally.openPopup(formId, {
      layout: 'modal',
      width: 700,
      autoClose: 5000,
      hideTitle: true
    });
  }

  render() {
    return html`<a class="btn" href="https://tally.so/r/${formId}" @click="${this._openInquiry}">${t('consulting.cta')}</a>`;
  }
}

ConsultingCta.styles = [btnCss, css`
  :host {
    display: inline-block;
    margin: 1rem 0;
  }
  .btn {
    display: block;
    background: #202428;
    color: #fff;
    border-radius: 8px;
    padding: 12px 22px;
    text-align: center;
  }
  .btn:hover { background: #175d82; border-color: #175d82; }
  .btn:focus-visible { outline: 3px solid #175d82; outline-offset: 4px; }
`];
