import { LitElement, html, css } from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import menu from '../config/menu.yml';
import router from '../services/router';
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
    this._unwatch.push(watchMedia('(min-width: 768px)', v => this._isMobile = !v));
    document.addEventListener('keypress', (event) => {
      // ctrl + alt + shift + V
      if (event.ctrlKey && event.altKey && event.shiftKey && event.keyCode === 86) {
        console.log(process.env.COMMIT_HASH || 'unknown');
      }
    });
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

    return html`
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
      <div id="notifications"></div>
    `;
  }
}

App.styles = [
  css`
    :host {
      display: block;
    }

    #notifications {
      position: fixed;
      position: sticky;
      right: 10px;
      bottom: 10px;
      z-index: 50;
      max-width: 50%;
      width: 320px;
    }
  `
];
