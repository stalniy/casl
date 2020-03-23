import { LitElement } from 'lit-element';
import { render } from 'github-buttons';
import config from '../config/app';

export default class GithubButton extends LitElement {
  static cName = 'github-button';
  static properties = {
    href: { type: String },
    size: { type: String },
    theme: { type: String },
    showCount: { type: Boolean },
    text: { type: String }
  };

  constructor() {
    super();

    this.href = config.repoURL;
    this.size = undefined;
    this.theme = 'light';
    this.showCount = true;
    this.text = undefined;
  }

  _collectOptions() {
    return {
      href: this.href,
      'data-size': this.size,
      'data-color-scheme': this.theme,
      'data-show-count': this.showCount,
      'data-text': this.text
    };
  }

  update() {
    render(this._collectOptions(), (el) => {
      if (this.shadowRoot.firstChild) {
        this.shadowRoot.replaceChild(el, this.shadowRoot.firstChild);
      } else {
        this.shadowRoot.appendChild(el);
      }
    });
  }
}
