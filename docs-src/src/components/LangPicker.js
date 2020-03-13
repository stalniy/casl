import { html, LitElement } from 'lit-element';
import router from '../services/router';

export default class LangPicker extends LitElement {
  static cName = 'app-lang-picker';

  render() {
    return html`
      <select @change="${this._changeLang}">
        <option value="ru">ru</option>
        <option value="uk">uk</option>
      </select>
    `;
  }

  _changeLang(event) {
    const lang = event.target.value;
    const current = router.current().response

    router.navigate({
      url: router.url({
        name: current.name,
        params: { ...current.params, lang },
        query: current.location.query,
        hash: current.location.hash,
      })
    });
  }
}
