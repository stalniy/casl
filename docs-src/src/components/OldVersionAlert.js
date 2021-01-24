import { LitElement, html, css } from 'lit-element';
import { getCurrentVersion, genCurrentUrlForVersion, fetchVersions } from '../services/version';
import { ut } from '../directives/i18n';
import { alertCss, mdCss } from '../styles';

export default class OldVersionAlert extends LitElement {
  static cName = 'old-version-alert';

  constructor() {
    super();
    this._versions = [];
    this._currentVersion = getCurrentVersion() || 'unknown';
  }

  async connectedCallback() {
    super.connectedCallback();
    this._versions = await fetchVersions();
    this.requestUpdate();
  }

  render() {
    const latestVersion = this._versions[this._versions.length - 1];

    if (!latestVersion || latestVersion.number === this._currentVersion) {
      return html``;
    }

    return html`
      <div class="alert alert-warning">
        ${ut('oldVersionAlert', {
    latestVersion: latestVersion.number,
    currentVersion: this._currentVersion,
    latestVersionUrl: genCurrentUrlForVersion(latestVersion.number),
  })}
      </div>
    `;
  }
}

OldVersionAlert.styles = [
  mdCss,
  alertCss,
  css`
    a {
      color: inherit;
    }
  `,
];
