import { LitElement, html, css } from 'lit-element';
import menu from '../config/menu.yml';

const ICONS = {
  github: html`
    <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub icon</title><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
  `,
  x: html`
    <svg aria-labelledby="simpleicons-x-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-x-icon" lang="en">X icon</title><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
  `,
  medium: html`
    <svg aria-labelledby="simpleicons-medium-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-medium-icon" lang="en">Medium icon</title><path fill="currentColor" d="M2.846 6.36c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.26l5.378 11.795 4.728-11.795H24v.403l-1.917 1.837c-.165.126-.247.333-.213.538v13.5c-.034.204.048.41.213.537l1.87 1.837v.403h-9.41v-.403l1.937-1.882c.19-.19.19-.246.19-.538V7.794l-5.39 13.688h-.727L4.278 7.794v9.174c-.052.386.076.774.347 1.053l2.52 3.06v.402H0v-.403l2.52-3.06c.27-.278.39-.67.326-1.052V6.36z"></path></svg>
  `
};

export default class SocialLinks extends LitElement {
  static cName = 'app-social-links';

  render() {
    return html`
      <nav aria-label="Social links">
        ${menu.social.map(item => html`
          <a href="${item.url}" target="_blank" rel="noopener noreferrer"
            aria-label="${item.label}" title="${item.label}">
            ${ICONS[item.icon]}
          </a>
        `)}
      </nav>
    `;
  }
}

SocialLinks.styles = css`
  :host {
    display: block;
    flex-shrink: 0;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 40px;
    color: #67676c;
    text-decoration: none;
  }

  a:hover {
    color: #81a2be;
  }

  a:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -2px;
    border-radius: 4px;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
