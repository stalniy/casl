import { fetch } from '../services/http';
import { pages } from '../content/pages.pages';

export async function loadPage(locale, name) {
  const page = await fetch(pages[locale][name]);

  return { ...page.data, ...page };
}
