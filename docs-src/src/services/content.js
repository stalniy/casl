import ContentType from './ContentType';
import * as pagesDetails from '../content/pages.pages';

const contentTypes = {
  page: new ContentType(pagesDetails),
};

export default (type) => {
  const contentLoader = contentTypes[type];

  if (!contentLoader) {
    throw new TypeError(`Unknown content loader "${type}".`);
  }

  return contentLoader;
};
