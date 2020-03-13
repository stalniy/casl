import { LitElement, html, css } from 'lit-element';
import router from '../services/router';

export default class Link extends LitElement {
  static cName = 'app-link';
  static properties = {
    to: { type: String },
    params: { type: Object, attribute: false },
    query: { type: Object, attribute: false },
    hash: { type: String },
    active: { type: Boolean }
  };

  constructor() {
    super();

    this.to = '';
    this.active = false;
    this.query = null;
    this.params = null;
    this.hash = '';
    this._url = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._navigate.bind(this), false);
  }

  update(changed) {
    const isUrlChanged = ['to', 'query', 'params', 'hash'].some(prop => changed.has(prop));

    if (this._url === null || isUrlChanged) {
      this._url = this._generateUrl();
    }

    return super.update(changed);
  }

  _generateUrl() {
    return router.url({
      name: this.to,
      hash: this.hash,
      params: this.params,
      query: this.query,
    });
  }

  render() {
    return html`
      <a
        itemprop="url"
        href="${this._url}"
        class="${this.active ? 'active' : ''}"
      >
        <slot></slot>
      </a>
    `;
  }

  _navigate(event) {
    event.preventDefault();
    router.navigate({ url: this._url })
  }
}

Link.styles = css`
  :host {
    display: inline-block;
    vertical-align: baseline;
    text-decoration: underline;
  }

  a {
    display: block;
    height: 100%;
    font-size: inherit;
    color: inherit;
    text-decoration: inherit;
  }

  a:hover {
    text-decoration: none;
  }

  a.active {
    color: var(--app-link-active-color);
  }
`;
