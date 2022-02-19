declare var self: ServiceWorkerGlobalScope;

const CACHE = 'cache-and-update-v1';

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
  console.log('[SW] installed');

  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['utils.ts']))
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] activated');
});

// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
// self.addEventListener('fetch', (event) => {
//   console.log('[SW] request has been sent to the server');

//   // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
//   // event.respondWith(fromCache(event.request));
//   // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
//   event.waitUntil(update(event.request));
// });

async function fromCache(request) {
  return caches.match(request).then(matching => matching ?? Promise.reject('no-match'));
}

function update(request) {
  return caches.open(CACHE).then(cache => fetch(request).then(response => cache.put(request, response)));
}

export default null;