import { LitElement, html, css } from 'lit-element';
import router from '../services/router';

export default class Link extends LitElement {
  static cName = 'app-link';
  static properties = {
    to: { type: String },
    params: { type: Object },
    query: { type: Object },
    hash: { type: String },
    active: { type: Boolean },
    nav: { type: Boolean }
  };

  constructor() {
    super();

    this.to = '';
    this.active = false;
    this.query = null;
    this.params = null;
    this.hash = '';
    this.nav = false;
    this._url = null;
    this._unwatchRouter = null;
  }

  _isActive(response) {
    return this.to === response.name
      && this._getUrl().endsWith(response.location.pathname);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._navigate.bind(this), false);

    if (this.nav) {
      this._unwatchRouter = router.observe((route) => {
        this.active = this._isActive(route.response);
      }, { initial: true });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._unwatchRouter) {
      this._unwatchRouter();
    }
  }

  update(changed) {
    const isUrlChanged = ['to', 'query', 'params', 'hash'].some(prop => changed.has(prop));

    if (this._url === null || isUrlChanged) {
      this._url = this._generateUrl();
    }

    if (this.nav && changed.has('active')) {
      const toggle = this.active ? 'add' : 'remove';
      this.classList[toggle]('active');
    }

    return super.update(changed);
  }

  _getUrl() {
    this._url = this._url || this._generateUrl();
    return this._url;
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
      <a itemprop="url" href="${this._url}">
        <slot></slot>
      </a>
    `;
  }

  _navigate(event) {
    if (!event.ctrlKey) {
      event.preventDefault();
      router.navigate({ url: this._url });
    }
  }
}

Link.styles = css`
  :host {
    display: inline-block;
    vertical-align: baseline;
    text-decoration: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  :host(:hover),
  :host(.active) {
    border-bottom-color: #81a2be;
  }

  a {
    font-size: inherit;
    color: inherit;
    text-decoration: inherit;
  }

  a:hover {
    text-decoration: inherit;
  }

  a.active {
    color: var(--app-link-active-color);
  }
`;
