import { LitElement, html, css } from 'lit-element';

// The parent supplies localized content; this component provides tab navigation.
export default class AuthorizationTimeline extends LitElement {
  static cName = 'authorization-timeline';
  static properties = {
    label: { type: String },
    _selected: { state: true },
    _stages: { state: true },
  };

  constructor() {
    super();
    this.label = '';
    this._selected = 0;
    this._stages = [];
  }

  firstUpdated() {
    this._readStages();
  }

  _readStages() {
    this._stages = Array.from(this.querySelectorAll(':scope > section'));
    this._select(Math.min(this._selected, Math.max(0, this._stages.length - 1)));
  }

  _select(index, focus = false) {
    this._selected = index;
    this._stages.forEach((stage, stageIndex) => {
      // Overlapping grid cells reserve space for the largest panel, avoiding
      // layout jumps while keeping inactive content out of the accessibility tree.
      stage.toggleAttribute('data-active', stageIndex === index);
      stage.hidden = stageIndex !== index;
      stage.inert = stageIndex !== index;
      stage.setAttribute('aria-hidden', String(stageIndex !== index));
    });
    if (focus) this.updateComplete.then(() => this.shadowRoot.getElementById(`stage-${index}`)?.focus());
  }

  _onKeydown(event) {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next = this._selected;
    if (event.key === 'ArrowRight') next = (next + 1) % this._stages.length;
    if (event.key === 'ArrowLeft') next = (next - 1 + this._stages.length) % this._stages.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = this._stages.length - 1;
    this._select(next, true);
  }

  render() {
    return html`
      <div role="tablist" aria-label="${this.label}" @keydown="${this._onKeydown}">
        ${this._stages.map((stage, index) => html`
          <button type="button" role="tab" id="stage-${index}"
            aria-selected="${this._selected === index}" aria-controls="stage-panel"
            tabindex="${this._selected === index ? 0 : -1}"
            @click="${() => this._select(index)}">
            <span class="number" aria-hidden="true">0${index + 1}</span>
            <span>${stage.dataset.title}</span>
          </button>
        `)}
      </div>
      <div id="stage-panel" role="tabpanel" tabindex="0" aria-labelledby="stage-${this._selected}">
        <slot @slotchange="${this._readStages}"></slot>
      </div>
    `;
  }
}

AuthorizationTimeline.styles = css`
  :host { display: block; margin: 28px 0 16px; }
  [role="tablist"] { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0; }
  button { position: relative; display: flex; flex-direction: column; align-items: center; gap: 10px; background: transparent; border: 0; padding: 16px 4px 20px; color: #526575; font: inherit; font-size: .95rem; font-weight: 600; line-height: 1.3; cursor: pointer; }
  button::before { content: ''; position: absolute; top: 34px; left: 0; width: 100%; height: 2px; background: #becfd9; }
  button:first-child::before { left: 50%; width: 50%; }
  button:last-child::before { width: 50%; }
  .number { position: relative; z-index: 1; display: grid; place-items: center; width: 36px; height: 36px; border: 2px solid #becfd9; border-radius: 50%; background: #fff; color: #526575; font: 600 .75rem/1 monospace; }
  [aria-selected="true"] { color: #175d82; }
  [aria-selected="true"] .number { background: #175d82; border-color: #175d82; color: #fff; }
  button:hover .number { border-color: #175d82; }
  button:focus-visible, [role="tabpanel"]:focus-visible { outline: 3px solid #175d82; outline-offset: -3px; border-radius: 6px; }
  [role="tabpanel"] { background: #eff4f7; border: 1px solid #cbd8e1; border-radius: 10px; padding: clamp(18px, 3vw, 32px); }
  slot { display: grid; }
  ::slotted(section) {
    display: block;
    grid-area: 1 / 1;
    display: none;
    pointer-events: none;
    min-width: 0;
  }
  ::slotted(section[data-active]) {
    display: block;
    pointer-events: auto;
  }
  @media (max-width: 560px) {
    button { font-size: .72rem; padding-inline: 1px; overflow-wrap: anywhere; }
    .number { width: 30px; height: 30px; }
    button::before { top: 31px; }
  }
`;
