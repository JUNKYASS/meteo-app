declare var self: ServiceWorkerGlobalScope;

const CACHE = 'cache-and-update-v1';

self.addEventListener('install', (event) => { // After worker installed we will cache static data
  console.log('[SW] installed');

  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['index.html', 'app.js']))
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] activated');
});

self.addEventListener('fetch', (event) => { // Use cache first if we have "fetch" and then update it using data from the server
  console.log('[SW] request has been sent to the server');

  event.respondWith(fromCache(event.request)); // To response immediately without waiting data from the server
  event.waitUntil(update(event.request)); // Ask for the data from the server and make update
});

function fromCache(request) {
  return caches.open(CACHE).then(cache => cache.match(request).then(matching => matching ?? Promise.reject('no-match')));
}

function update(request) {
  return caches.open(CACHE).then(cache => fetch(request).then(response => cache.put(request, response)));
}

export default null;