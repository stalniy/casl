import { LitElement, html, css } from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import menu from '../config/menu.yml';
import router from '../services/router.js';
import watchMedia from '../hooks/watchMedia.js';
import { t } from '../directives/i18n.js';

export default class App extends LitElement {
  static cName = 'casl-docs';
  static properties = {
    ready: { type: Boolean },
    _isMobile: { type: Boolean },
    _route: { type: Object },
  };

  constructor() {
    super();
    this.addEventListener('content-error', (event) => {
      this.setAttribute('data-content-error', event.detail?.message || event.target.getAttribute('data-content-error') || 'content request failed');
    });
    this._route = null;
    this._notificationsRoot = null;
    this._menu = null;
    this._isMobile = false;
    this.ready = false;
    this._routeVersion = 0;
    this._routePath = '';
    this._unwatch = [];
    this._publishReadiness = this._publishReadiness.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._unwatch.push(router.observe((route) => {
      this.ready = false;
      this._routeVersion += 1;
      this._route = route.response;
      this._routePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      this.removeAttribute('data-rendered-route');
      this.removeAttribute('data-content-error');
      this.removeAttribute('data-content-not-found');
      this._closeMenu();
    }, { initial: true }));
    this._unwatch.push(watchMedia('(min-width: 768px)', v => this._isMobile = !v));
    document.addEventListener('keypress', (event) => {
      // ctrl + shift + v
      if (event.ctrlKey && event.shiftKey && event.keyCode === 22) {
        console.log(import.meta.env.COMMIT_HASH || 'unknown');
      }
    }, false);
    const timerId = setTimeout(() => console.warn(`Page did not report readiness in 10sec.`), 10_000);
    const cancelTimer = () => clearTimeout(timerId);
    this.addEventListener('route-ready', cancelTimer, { once: true, passive: true });
    this._unwatch.push(cancelTimer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unwatch.forEach(unwatch => unwatch());
  }

  updated() {
    this._menu ??= this.shadowRoot.querySelector('menu-drawer');
  }

  async _publishReadiness(event) {
    const source = event.composedPath()[0];
    if (!this.ready || !this._route || !source?.isConnected) return;
    const routeVersion = this._routeVersion;
    const routePath = this._routePath;
    await this.updateComplete;
    if (!source.isConnected || routeVersion !== this._routeVersion || routePath !== `${window.location.pathname}${window.location.search}${window.location.hash}`) return;

    this.toggleAttribute('data-content-not-found', event.detail?.notFound === true);
    this.setAttribute('data-rendered-route', routePath);
    this.dispatchEvent(new CustomEvent('route-ready', { detail: { path: routePath } }));
  }

  _toggleMenu() {
    this._menu?.toggle();
  }

  _closeMenu() {
    this._menu?.close();
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
    if (!this._isMobile) return null;

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
          .isContainerRestricted="${this._route.name === 'home'}"
          @toggle-menu="${this._toggleMenu}"
        >
          <div slot="aside">${sidebar}</div>
          <div @content-ready="${this._publishReadiness}">${cache(body.main || body)}</div>
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
  `
];

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
