---
---

'use strict';

importScripts('./assets/js/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'casl-cache-{{ site.github.build_revision }}'
};

const prefix = location.pathname.replace(/sw\.js$/, '')

self.toolbox.precache([
  `${prefix}assets/js/doc.js`,
  `${prefix}assets/css/style.css`,
  `${prefix}assets/css/print.css`,
  `${prefix}index.html`,
  `${prefix}manifest.json`,
  `${prefix}abilities/2017/07/20/define-abilities.html`,
  `${prefix}abilities/2017/07/21/check-abilities.html`
]);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);
self.toolbox.router.get('https://api.github.com/repos/stalniy/casl', self.toolbox.cacheFirst)

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.indexOf('casl-cache-') === 0) {
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
})
