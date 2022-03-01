import { LitElement, html, css } from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import menu from '../config/menu.yml';
import router from '../services/router';
import watchMedia from '../hooks/watchMedia';
import { t } from '../directives/i18n';

function createNotificationsRoot() {
  const root = document.createElement('div');

  Object.assign(root.style, {
    position: 'fixed',
    right: '10px',
    bottom: '10px',
    zIndex: 50,
    width: '320px'
  });
  document.body.appendChild(root);
  return root;
}

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
    this._unwatch.push(watchMedia('(min-width: 768px)', v => this._isMobile = !v));
    document.addEventListener('keypress', (event) => {
      // ctrl + shift + v
      if (event.ctrlKey && event.shiftKey && event.keyCode === 22) {
        console.log(process.env.COMMIT_HASH || 'unknown');
      }
    }, false);
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

    this._notificationsRoot = this._notificationsRoot || createNotificationsRoot();
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

  _getLayout(sidebar) {
    if (this._route.name === 'home') {
      return '';
    }

    if (this._isMobile) {
      return 'col-1';
    }

    return sidebar ? 'col-2' : 'col-1';
  }

  render() {
    if (!this._route || !this.ready) {
      return null;
    }

    const { body } = this._route;
    const sidebar = body.sidebar ? cache(body.sidebar) : '';
    const stopWar = `
      Stop war in Ukraine. <a href="https://dearrussian.wtf" target="_blank">All truth about Russia invasion</a>
    `;

    return html`
      <app-notification class="stop-war" .message="${stopWar}"></app-notification>
      <menu-drawer ?disabled="${!this._isMobile}">
        <div slot="menu">${this._renderDrawerMenu(sidebar)}</div>
        <app-root
          theme="${this._isMobile ? 'mobile' : 'default'}"
          layout="${this._getLayout(!!sidebar)}"
          .menu="${menu}"
          @toggle-menu="${this._toggleMenu}"
        >
          <div slot="aside">${sidebar}</div>
          ${cache(body.main || body)}
        </app-root>
      </menu-drawer>
    `;
  }
}

App.styles = [
  css`
    :host {
      display: block;
    }

    .stop-war {
      position: fixed;
      z-index: 1000;
      top: 5px;
      right: 5px;
    }
  `
];
