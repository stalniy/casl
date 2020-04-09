import { LitElement, css, html } from 'lit-element';
import gridCss from '../styles/grid';

export default class AppRoot extends LitElement {
  static cName = 'app-root';
  static properties = {
    theme: { type: String },
    layout: { type: String },
    menu: { type: Object },
  };

  constructor() {
    super();
    this.theme = 'default';
    this.menu = null;
    this.layout = '';
  }

  render() {
    return html`
      <app-header theme="${this.theme}" .menu="${this.menu}"></app-header>
      <section class="content ${this.layout === 'col-2' ? 'row' : this.layout}">
        <aside>
          <div class="aside">
            <slot name="aside"></slot>
          </div>
        </aside>
        <main><slot></slot></main>
      </section>
      <app-footer></app-footer>
    `;
  }
}

AppRoot.styles = [
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

    .row > main,
    .col-1 > main {
      padding-bottom: 50px;
      min-width: 0;
      padding: 0 10px;
    }

    aside {
      display: none;
    }

    @media (min-width: 768px) {
      .aside {
        position: sticky;
        top: 54px;
        height: calc(100vh - 132px);
        overflow-y: auto;
        padding-top: 2rem;
        padding-bottom: 50px;
      }

      .row > aside {
        display: block;
        flex-basis: 260px;
        max-width: 260px;
        min-width: 200px;
        padding-left: 20px;
        box-shadow: rgba(0, 0, 0, 0.1) 1px -1px 2px 0px;
      }

      .row > main {
        flex-basis: 80%;
        margin: 0 auto;
        max-width: 800px;
      }
    }
  `
];
