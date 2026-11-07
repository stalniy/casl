import { LitElement, html, css } from 'lit-element';
import { cache } from 'lit-html/directives/cache.js';
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

  async _share() {
    try {
      await navigator.share({
        title: document.title,
        text: document.head.querySelector('meta[name="description"]')?.content || '',
        url: window.location.href,
      });
    } catch (error) {
      if (error.name !== 'AbortError') console.error('Unable to share page', error);
    }
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
    if (this._route.name === 'home' || this._route.name === 'consulting') {
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
    const sidebar = body?.sidebar ? cache(body.sidebar) : '';
    const main = body?.main || body;

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
          <div @content-ready="${this._publishReadiness}">${main ? cache(main) : null}</div>
        </app-root>
      </menu-drawer>
      <analytics-consent></analytics-consent>
      <div class="floating-actions">
        ${typeof navigator.share === 'function' ? html`
          <button type="button" class="action share" @click="${this._share}"
            aria-label="${t('buttons.share')}" title="${t('buttons.share')}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"></path>
            </svg>
          </button>
        ` : null}
        <a class="action question" href="https://github.com/stalniy/casl/discussions/categories/q-a"
          target="_blank" rel="noopener noreferrer"
          aria-label="${t('buttons.askQuestion')}" title="${t('buttons.askQuestion')}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-3 3V11.5A8.5 8.5 0 0 1 9.5 3h3a8.5 8.5 0 0 1 8.5 8.5Z"></path>
            <path d="M8.5 8a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3h.01"></path>
          </svg>
        </a>
      </div>
    `;
  }
}

App.styles = [
  css`
    :host {
      display: block;
    }

    .floating-actions {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 40;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #444c56;
      border-right: 0;
      border-radius: 4px 0 0 4px;
    }

    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 44px;
      height: 44px;
      padding: 10px;
      border: 0;
      background: #202428;
      color: #fff;
      font: 600 16px/1.5 "Helvetica Neue", Arial, sans-serif;
      cursor: pointer;
    }

    .action + .action {
      border-top: 1px solid #444c56;
    }

    .action:hover,
    .action:focus-visible {
      color: #58a6ff;
    }

    .action:focus-visible {
      outline: 2px solid #58a6ff;
      outline-offset: -3px;
    }

    .action svg {
      width: 24px;
      height: 24px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
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
