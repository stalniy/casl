import { LitElement, html, css } from 'lit-element';
import liqpayIcon from '../assets/payment-options/liqpay.svg';

const PAYMENT_OPTIONS = {
  liqpay: {
    qrcode: liqpayIcon
  }
};

function renderPaymentOption(name) {
  const option = PAYMENT_OPTIONS[name];

  if (!option) {
    console.warn(`Cannot find configuration for ${name} payment option`);
    return null;
  }

  let content;

  if (option.qrcode) {
    content = html`<img src="${option.qrcode}">`;
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
        <img src="${liqpayIcon}" alt="Liqpay" data-name="liqpay">
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
