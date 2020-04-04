import { LitElement, html, css } from 'lit-element';
import { ut } from '../directives/i18n';

export default class AppNotification extends LitElement {
  static cName = 'app-notification';
  static properties = {
    type: { type: String },
    message: { type: String }
  };

  constructor() {
    super();
    this.type = 'info';
    this.message = '';
  }

  render() {
    return html`${ut(this.message)}`;
  }
}

AppNotification.styles = css`
  :host {
    display: block;
    background: rgb(29, 31, 33);
    border-radius: 7px;
    padding: 1rem;
    color: #fff;
    cursor: pointer;
  }
`;
