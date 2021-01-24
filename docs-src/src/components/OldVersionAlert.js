import { LitElement, html, css } from 'lit-element';
import { ut } from '../directives/i18n';
import { alertCss, mdCss } from '../styles';
import { getCurrentVersion, genCurrentUrlForVersion, fetchVersions } from '../services/version';
import router from '../services/router';

export default class OldVersionAlert extends LitElement {
  static cName = 'old-version-alert';

  constructor() {
    super();
    this._versions = [];
    this._currentVersion = getCurrentVersion() || 'unknown';
  }

  async connectedCallback() {
    super.connectedCallback();
    this._unwatchRouter = router.observe(() => this.requestUpdate());
    this._versions = await fetchVersions();
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._unwatchRouter) {
      this._unwatchRouter();
    }
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
