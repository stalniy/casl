const OLD_TO_NEW_URL = {
  '/casl/abilities/2017/07/20/define-abilities.html': {
    name: 'page',
    params: { id: 'guide/define-rules', lang: 'en' }
  },
  '/casl/abilities/2017/07/21/check-abilities.html': {
    name: 'page',
    params: { id: 'guide/intro', lang: 'en' }
  },
  '/casl/abilities/errors/2017/07/21/error-handling.html': {
    name: 'page',
    params: { id: 'api/casl-ability', lang: 'en' },
    hash: 'forbidden-error'
  },
  '/casl/abilities/roles/2017/07/21/roles.html': {
    name: 'page',
    params: { id: 'cookbook/roles-with-static-permissions', lang: 'en' },
  },
  '/casl/abilities/storage/2017/07/22/storing-abilities.html': {
    name: 'page',
    params: { id: 'cookbook/cache-rules', lang: 'en' },
  },
  '/casl/abilities/database/integration/2017/07/22/database-integration.html': {
    name: 'page',
    params: { id: 'package/casl-mongoose', lang: 'en' },
  },
  '/casl/abilities/2017/07/23/use-cases.html': {
    name: 'page',
    params: { id: 'cookbook/intro', lang: 'en' },
  },
  '/casl/abilities/2017/12/18/dialect-support.html': {
    name: 'page',
    params: { id: 'guide/install', lang: 'en' },
    hash: 'explanation-of-different-builds'
  }
};

export function mapOldToNewUrl(path) {
  return OLD_TO_NEW_URL[path] || null;
}
