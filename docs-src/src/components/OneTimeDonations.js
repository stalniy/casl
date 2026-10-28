import { LitElement, html, css } from 'lit-element';
import { mdCss } from '../styles/index.js';

export default class OneTimeDonations extends LitElement {
  static cName = 'one-time-donations';

  render() {
    return html`
      <div class="options md">
        <a href="https://github.com/sponsors/stalniy" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
          </svg>
          GitHub Sponsors
        </a>
      </div>
    `;
  }
}

OneTimeDonations.styles = [
  mdCss,
  css`
    .options {
      margin: 20px 0;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    svg {
      color: #db61a2;
      flex-shrink: 0;
    }
  `,
];
