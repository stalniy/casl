import { LitElement, html, css } from 'lit-element';
import { monthlyDownloads } from '../services/npmDownloads.js';
import npmIconURL from '../assets/icons/npm.svg';

const downloadsFormat = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
});

export default class NpmDownloadsButton extends LitElement {
  static cName = 'npm-downloads-button';
  static properties = {
    downloads: { type: Number }
  };

  connectedCallback() {
    super.connectedCallback();
    monthlyDownloads().then((downloads) => {
      this.downloads = downloads;
    });
  }

  render() {
    return html`
      <a
        href="https://www.npmjs.com/package/@casl/ability"
        target="_blank"
        rel="noopener"
        title="@casl/ability downloads over the last 30 available days"
      >
        <span class="label"><img src="${npmIconURL}" alt="npm" width="24" height="9"></span>
        <span class="download-count">${this.downloads == null
          ? '—'
          : `${downloadsFormat.format(this.downloads)}/month`}</span>
      </a>
    `;
  }
}

NpmDownloadsButton.styles = css`
  :host {
    display: inline-flex;
  }

  a {
    display: inline-flex;
    align-items: center;
    height: 28px;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #444c56;
    border-radius: 4px;
    background: #202428;
    color: #fff;
    font: 600 12px/1 "Helvetica Neue", Arial, sans-serif;
    text-decoration: none;
  }

  a:hover,
  a:focus-visible {
    color: #58a6ff;
  }

  span {
    padding: 0 8px;
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .download-count {
    display: inline-flex;
    align-items: center;
    align-self: stretch;
    border-left: 1px solid #444c56;
    background: #30363d;
  }
`;
