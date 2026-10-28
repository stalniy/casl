import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, precacheAndRoute, PrecacheFallbackPlugin } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

const PUBLIC_PATH = import.meta.env.BASE_URL_PATH;
const BUILD_ID = import.meta.env.DOCS_BUILD_ID;
// Cache Storage is shared by all documentation versions on the origin.
const CACHE_SCOPE = `casl-docs${PUBLIC_PATH.replace(/\//g, '-') || '-root'}`;
const PAGES_CACHE = `${CACHE_SCOPE}-pages-${BUILD_ID}`;

const manifest = self.__WB_MANIFEST;
// The dev server injects an unrevisioned fallback. Give each dev build its own
// cached shell so a waiting worker cannot reuse the active build's document.
if (import.meta.env.DEV) {
  manifest.forEach(entry => { entry.revision = BUILD_ID; });
}
precacheAndRoute(manifest);
cleanupOutdatedCaches();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(names => Promise.all(names
    .filter(name => name.startsWith(`${CACHE_SCOPE}-pages-`) && name !== PAGES_CACHE)
    .map(name => caches.delete(name)))));
});

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: PAGES_CACHE,
    networkTimeoutSeconds: 5,
    plugins: [
      {
        // A newer document can arrive while its worker is waiting. Keep the
        // active build's HTML or shell available offline with matching assets.
        async cacheWillUpdate({ response }) {
          if (response.status !== 200) return null;
          const html = await response.clone().text();
          const build = html.match(/<meta\s+name="casl-build"\s+content="([^"]+)"/);
          return build && build[1] === BUILD_ID ? response : null;
        },
      },
      new PrecacheFallbackPlugin({ fallbackURL: `${PUBLIC_PATH}/app-shell.html` }),
    ],
  })
);

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.startsWith(`${PUBLIC_PATH}/images/`),
  new StaleWhileRevalidate({
    cacheName: `${CACHE_SCOPE}-images`,
    plugins: [new ExpirationPlugin({ maxEntries: 100 })],
  })
);
