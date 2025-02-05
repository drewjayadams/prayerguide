const CACHE_NAME = 'rosary-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
  // Add any other assets you want to cache, e.g., icons
];

// Installation: cache app shell files.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
         return cache.addAll(urlsToCache);
      })
  );
});

// Fetch: serve cached content when available.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
         // Return cached response if found; otherwise, fetch from network.
         return response || fetch(event.request);
      })
  );
});

// Activation: remove old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
