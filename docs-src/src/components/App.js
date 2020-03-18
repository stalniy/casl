import { LitElement, html, css } from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import menu from '../data/menu.yml';
import router from '../services/router';
import gridCss from '../styles/grid';

export default class App extends LitElement {
  static cName = 'casl-docs';
  static properties = {
    ready: { type: Boolean }
  };

  constructor() {
    super();
    this._route = null;
    this.ready = false;
  }

  connectedCallback() {
    super.connectedCallback();
    router.observe((route) => {
      this._route = route.response;
      this.requestUpdate();
    }, { initial: true });
  }

  render() {
    if (!this._route || !this.ready) {
      return html``;
    }

    const body = this._route.body;

    return html`
      <app-header .menu="${menu}"></app-header>
      <section class="${body.sidebar ? 'row' : ''} content" id="content">
        ${cache(body.sidebar ? html`<aside><div class="aside">${body.sidebar}</div></aside>` : '')}
        <main>${cache(body.main || body)}</main>
      </section>
      <app-footer></app-footer>
    `;
  }
}

App.styles = [
  gridCss,
  css`
    :host {
      display: block;
    }

    app-header {
      position: relative;
      position: sticky;
      top: 0;
      z-index: 10;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    }

    .row > main {
      flex-basis: 80%;
      margin: 0 auto;
      max-width: 800px;
      padding-bottom: 50px;
    }

    .row > aside {
      flex-basis: 260px;
      max-width: 260px;
      min-width: 200px;
      padding-left: 20px;
      margin-right: 20px;
      box-shadow: rgba(0, 0, 0, 0.1) 1px -1px 2px 0px;
    }

    .aside {
      position: sticky;
      top: 54px;
      height: calc(100vh - 132px);
      overflow-y: auto;
      padding-top: 2rem;
      padding-bottom: 50px;
    }
  `
];
