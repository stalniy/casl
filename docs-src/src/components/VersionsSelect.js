import { LitElement, html, css } from 'lit-element';
import { fetch } from '../services/http';

function getCurrentVersion() {
  const pathname = window.location.pathname;

  return /^\/v\d+\//.test(pathname)
    ? pathname.slice(1, pathname.indexOf('/', 1))
    : null;
}

const VERSION = process.env.CASL_VERSION || '';

export default class VersionsSelect extends LitElement {
  static cName = 'versions-select';

  constructor() {
    super();

    this._versions = [];
    this._currentVersion = getCurrentVersion() || VERSION;

    if (this._currentVersion) {
      this._versions.push(this._currentVersion);
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    const response = await fetch('/versions.txt', { format: 'txtArrayJSON' });

    this._versions = response.body.slice(0).reverse();
    this.requestUpdate();
  }

  render() {
    return html`
      <select @change=${this._updateVersion}>
        ${this._versions.map(version => html`
          <option .selected=${version.number === this._currentVersion}>${version.number}</option>
        `)}
      </select>
    `;
  }

  _updateVersion(event) {
    const selectedVersion = event.target.value;
    window.location.href = window.location.href
      .replace(`/${this._currentVersion}/`, `/${selectedVersion}/`);
  }
}

VersionsSelect.styles = css`
  :host {
    display: inline-block;
  }

  select {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: rgb(68, 68, 68);
    line-height: 1.3;
    padding-left: 0.5em;
    padding-right: 1.1em;
    box-sizing: border-box;
    margin: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23444444%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right .5em top 50%;
    background-size: .5em auto;
    border: 0;
    cursor: pointer;
  }

  /* Hide arrow icon in IE browsers */
  select::-ms-expand {
    display: none;
  }

  select:focus {
    outline: none;
  }
`;
