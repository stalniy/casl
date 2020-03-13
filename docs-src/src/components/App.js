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
      <section class="${body.sidebar ? 'row2' : ''} content" id="content">
        <!-- ${cache(body.sidebar ? html`<aside>${body.sidebar}</aside>` : '')} -->
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
      flex-basis: 70%;
      max-width: 70%;
    }

    .row > aside {
      flex-basis: 30%;
      max-width: 30%;
      padding-left: 20px;
    }

    // main {
    //   margin: auto;
    //   max-width: 700px;
    // }
  `
];
