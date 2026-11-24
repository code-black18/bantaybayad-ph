const cacheName = 'bantaybayad-shell-v22';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.add('./')).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate' || event.request.url !== new URL('./', self.registration.scope).href) return;
  event.respondWith(fetch(event.request).catch(async () => (await (await caches.open(cacheName)).match('./')) || Response.error()));
});
