import { LitElement, html, css } from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import menu from '../config/menu.yml';
import router from '../services/router';
import gridCss from '../styles/grid';
import watchMedia from '../hooks/watchMedia';
import { t } from '../directives/i18n';

export default class App extends LitElement {
  static cName = 'casl-docs';
  static properties = {
    ready: { type: Boolean },
    _isMobile: { type: Boolean },
    _route: { type: Object },
  };

  constructor() {
    super();
    this._route = null;
    this._notificationsRoot = null;
    this._menu = null;
    this._isMobile = false;
    this.ready = false;
    this._unwatch = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this._unwatch.push(router.observe((route) => {
      this._route = route.response;
      this._closeMenu();
    }, { initial: true }));
    this._unwatch.push(watchMedia('(max-width: 768px)', v => this._isMobile = v));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unwatch.forEach(unwatch => unwatch());
  }

  updated() {
    this._menu = this._menu || this.shadowRoot.querySelector('menu-drawer');
  }

  _toggleMenu() {
    if (this._menu) {
      this._menu.toggle();
    }
  }

  _closeMenu() {
    if (this._menu) {
      this._menu.close();
    }
  }

  notify(message, options = {}) {
    const notification = document.createElement('app-notification');

    notification.message = message;

    if (typeof options.onClick === 'function') {
      notification.addEventListener('click', options.onClick, false);
    }

    this._notificationsRoot = this._notificationsRoot
      || this.shadowRoot.getElementById('notifications');
    this._notificationsRoot.appendChild(notification);
  }

  _renderDrawerMenu(sidebar) {
    if (!this._isMobile) {
      return null;
    }

    return html`
      ${sidebar}
      <h3>${t('menu.root')}</h3>
      <app-menu .items="${menu.items}" expanded></app-menu>
    `;
  }

  render() {
    if (!this._route || !this.ready) {
      return null;
    }

    const { body } = this._route;
    const sidebar = body.sidebar ? cache(html`<aside><div class="aside">${body.sidebar}</div></aside>`) : '';

    return html`
      <menu-drawer ?disabled="${!this._isMobile}">
        <div class="menu" slot="menu">
          ${this._renderDrawerMenu(sidebar)}
        </div>
        <div class="main">
          <app-header
            theme="${this._isMobile ? 'mobile' : 'default'}"
            .menu="${menu}"
            @toggle-menu="${this._toggleMenu}"
          ></app-header>
          <section class="${sidebar ? 'row' : ''} content">
            ${this._isMobile ? '' : sidebar}
            <main>${cache(body.main || body)}</main>
          </section>
          <app-footer></app-footer>
        </div>
      </menu-drawer>
      <div id="notifications"></div>
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
      margin: 5px;
      padding-bottom: 50px;
      min-width: 0;
    }

    .menu {
      padding: 10px;
    }

    .menu app-quick-search {
      margin-bottom: 20px;
    }

    .main {
      background: #fff;
    }

    #notifications {
      position: fixed;
      right: 10px;
      bottom: 10px;
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
        flex-basis: 260px;
        max-width: 260px;
        min-width: 200px;
        padding-left: 20px;
        margin-right: 20px;
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
