import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n.js';
import { btnCss } from '../styles/index.js';

const mediaRoot = `${import.meta.env.BASE_URL_PATH}/media/why-casl-v1`;

export default class WhyCaslVideo extends LitElement {
  static cName = 'why-casl-video';

  disconnectedCallback() {
    this._close();
    super.disconnectedCallback();
  }

  _show() {
    if (this._isOpen) return;
    const dialog = this.shadowRoot.querySelector('dialog');
    const video = this.shadowRoot.querySelector('video');
    this._previousOverflow = document.body.style.overflow;
    this._previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar) {
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    }
    document.body.style.overflow = 'hidden';
    this._isOpen = true;
    this.shadowRoot.querySelector('[role="status"]').hidden = true;
    video.poster = `${mediaRoot}.webp`;
    video.src = `${mediaRoot}.mp4`;
    dialog.showModal();
    this.shadowRoot.querySelector('.close').focus();
    // Keep playback within the trigger's user activation. Native controls remain
    // available if the browser blocks playback or closing interrupts loading.
    video.play().catch(() => {});
  }

  _close() {
    if (!this._isOpen) return;
    const video = this.shadowRoot.querySelector('video');
    video.pause();
    this._isOpen = false;
    video.currentTime = 0;
    video.removeAttribute('src');
    video.removeAttribute('poster');
    video.load();
    this.shadowRoot.querySelector('dialog').close();
    document.body.style.overflow = this._previousOverflow;
    document.body.style.paddingRight = this._previousPadding;
    if (this.isConnected) this.shadowRoot.querySelector('.trigger').focus();
  }

  _cancel(event) {
    event.preventDefault();
    this._close();
  }

  _backdrop(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom) this._close();
  }

  render() {
    return html`
      <button class="btn trigger" type="button" aria-haspopup="dialog" @click="${this._show}">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
          fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
          <rect x="3" y="6" width="12" height="12" rx="2" />
          <path d="m15 10 6-4v12l-6-4z" />
        </svg>
        ${t('video.title')}
      </button>
      <dialog aria-labelledby="video-title" @cancel="${this._cancel}" @click="${this._backdrop}">
        <header>
          <h2 id="video-title">${t('video.title')}</h2>
          <button class="close" type="button" @click="${this._close}">${t('video.close')} ×</button>
        </header>
        <video controls playsinline preload="none" aria-label="${t('video.title')}"
          @error="${() => { this.shadowRoot.querySelector('[role="status"]').hidden = false; }}">
          ${t('video.unsupported')}
        </video>
        <footer>
          <span role="status" hidden>${t('video.error')}</span>
          <a href="${mediaRoot}.mp4" target="_blank" rel="noopener">${t('video.fallback')}</a>
        </footer>
      </dialog>
    `;
  }
}

WhyCaslVideo.styles = [btnCss, css`
  :host { display: inline-block; }
  button { font: inherit; cursor: pointer; }
  .trigger { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; }
  svg { flex-shrink: 0; }
  button:focus-visible, a:focus-visible { outline: 3px solid #81a2be; outline-offset: 3px; }
  dialog {
    box-sizing: border-box;
    width: min(1100px, calc(100vw - 24px), calc((100dvh - 140px) * 16 / 9));
    max-width: calc(100vw - 24px);
    max-height: calc(100dvh - 24px);
    padding: 0;
    border: 1px solid #546474;
    border-radius: 12px;
    background: #131c26;
    color: #fff;
    box-shadow: 0 16px 64px #0008;
  }
  dialog::backdrop { background: #080e16d9; }
  header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; gap: 16px; }
  h2 { margin: 0; font-size: 1.1rem; }
  .close { border: 1px solid #81a2be; border-radius: 6px; padding: 6px 10px; background: transparent; color: inherit; }
  video { display: block; width: 100%; aspect-ratio: 16 / 9; background: #000; }
  footer { padding: 12px 16px; font-size: .85rem; }
  a { color: #badbf6; }
  [role="status"] { margin-right: 8px; }
`];
