import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n';
import liqpayIcon from '../assets/payment-options/liqpay.svg';
import liqpayQrCode from '../assets/payment-options/liqpay-qrcode.png';

const PAYMENT_OPTIONS = {
  liqpay: {
    icon: liqpayIcon,
    image: liqpayQrCode
  }
};
const PAYMENT_NAMES = Object.keys(PAYMENT_OPTIONS);

function renderPaymentOption(name) {
  const option = PAYMENT_OPTIONS[name];

  if (!option) {
    console.warn(`Cannot find configuration for ${name} payment option`);
    return null;
  }

  let content;

  if (option.image) {
    content = html`<img src="${option.image}">`;
  }

  return html`<div class="selected">${content}</div>`;
}

export default class OneTimeDonations extends LitElement {
  static cName = 'one-time-donations';
  static properties = {
    selected: { type: String }
  };

  constructor() {
    super();
    this.selected = '';
  }

  connectedCallback() {
    super.connectedCallback();

    if (PAYMENT_NAMES.length === 1) {
      this.selected = PAYMENT_NAMES[0];
    }
  }

  _setSelected({ target }) {
    if (target.tagName !== 'IMG') {
      this.selected = '';
      return;
    }

    this.selected = target.getAttribute('data-name');
  }

  render() {
    return html`
      <div class="options" @click=${this._setSelected}>
        ${PAYMENT_NAMES.map(name => html`
          <img src="${PAYMENT_OPTIONS[name].icon}" alt="${t(`payment.${name}`)}" data-name="${name}">
        `)}
      </div>
      ${this.selected ? renderPaymentOption(this.selected) : ''}
    `;
  }
}

OneTimeDonations.styles = css`
  .options {
    margin: 20px 0;
  }

  .options img {
    margin: 10px;
    cursor: pointer
  }

  .selected {
    text-align: center;
  }
`;
