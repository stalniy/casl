import { html, css } from 'lit-element';
import I18nElement from './I18nElement.js';
import { t, ut } from '../directives/i18n.js';
import { mdCss, codeCss } from '../styles/index.js';

export default class AuthorizationExamples extends I18nElement {
  static cName = 'authorization-examples';
  static properties = {
    _rebacApproach: { state: true },
  };

  constructor() {
    super();
    this._rebacApproach = 'denormalized';
  }

  reload() {
    return Promise.resolve();
  }

  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    await this.shadowRoot.querySelector('authorization-timeline').updateComplete;
    return complete;
  }

  render() {
    return html`
      <div class="md">
        <authorization-timeline .label="${t('consulting.evolution.modelsLabel')}">
          ${['claims', 'actions', 'rbac', 'abac', 'rebac'].map(stage => {
            const contentKey = stage === 'rebac'
              ? `consulting.evolution.rebac.${this._rebacApproach}`
              : `consulting.evolution.${stage}`;
            return html`
            <section data-stage="${stage}" data-title="${t(`consulting.evolution.${stage}.title`)}">
              <div class="stage-layout">
                <div class="stage-copy">
                  <div class="stage-heading">
                    <span class="eyebrow">${t(`consulting.evolution.${stage}.eyebrow`)}</span>
                    <h3>${t(`consulting.evolution.${stage}.title`)}</h3>
                  </div>
                  <p>${t(`consulting.evolution.${stage}.description`)}</p>
                  ${stage === 'rebac' ? html`
                    <div class="rebac-approaches" role="radiogroup"
                      aria-label="${t('consulting.evolution.rebac.approachesLabel')}">
                      ${['denormalized', 'sql'].map(approach => html`
                        <label>
                          <input type="radio" name="rebac-approach" value="${approach}"
                            .checked="${this._rebacApproach === approach}"
                            aria-controls="rebac-example"
                            @change="${() => { this._rebacApproach = approach; }}">
                          <span>${t(`consulting.evolution.rebac.${approach}.label`)}</span>
                        </label>
                      `)}
                    </div>
                  ` : ''}
                  <div class="stage-detail">${ut(`${contentKey}.detail`)}</div>
                </div>
                <div class="stage-code" role="region" tabindex="0"
                  id="${stage}-example"
                  aria-label="${t(`consulting.evolution.${stage}.title`)} — ${t('consulting.evolution.codeLabel')}">
                  ${ut(`${contentKey}.example`)}
                </div>
              </div>
            </section>
          `;
          })}
        </authorization-timeline>
      </div>
    `;
  }
}

AuthorizationExamples.styles = [mdCss, codeCss, css`
  :host { display: block; min-width: 0; }
  * { box-sizing: border-box; }
  p { line-height: 1.6; }
  .md h3::before { content: none; }
  .eyebrow { display: block; font-size: .7rem; font-weight: 700; letter-spacing: .1em; color: #526575; }
  .stage-heading h3 { font-size: 1.5rem; font-weight: 600; margin: 0; cursor: auto; }
  .stage-heading .eyebrow { margin: 0 0 6px; }
  .stage-layout { display: grid; gap: 20px; align-items: start; }
  .stage-copy, .stage-code { min-width: 0; }
  .stage-copy > p { margin: 12px 0 0; }
  .stage-copy .stage-detail { color: #435764; font-size: .9rem; margin-top: 18px; }
  .stage-detail p { margin: 0; }
  .md .stage-detail app-link { color: #175d82; }
  .rebac-approaches { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 16px; padding: 4px; border: 1px solid #cbd8e1; border-radius: 8px; }
  .rebac-approaches label { position: relative; flex: 1; cursor: pointer; }
  .rebac-approaches input { position: absolute; opacity: 0; width: 1px; height: 1px; }
  .rebac-approaches span { display: block; padding: 8px 6px; border-radius: 5px; color: #435764; font-size: .85rem; font-weight: 600; text-align: center; }
  .rebac-approaches input:checked + span { background: #175d82; color: #fff; }
  .rebac-approaches input:focus-visible + span { outline: 3px solid #175d82; outline-offset: 2px; }
  .rebac-approaches label:hover span { box-shadow: inset 0 0 0 1px #175d82; }
  .stage-code {
    overflow-x: auto;
    background: #1d1f21;
    border-radius: 7px;
    padding: 18px;
  }
  .stage-code:focus-visible { outline: 3px solid #175d82; outline-offset: 3px; }
  .stage-code pre { overflow: visible; margin: 0; }
  .stage-code .hljs {
    overflow: visible;
    box-shadow: none;
    padding: 0;
    font-size: .8rem;
    line-height: 1.65;
    white-space: pre;
    overflow-wrap: normal;
    min-height: 18.15em;
  }
  .hljs-comment { color: #9aa6b2; }
  @media (min-width: 768px) {
    .stage-layout { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: 28px; }
    .stage-code { padding: 20px; }
    .stage-heading .eyebrow { margin-bottom: 8px; }
  }
`];
