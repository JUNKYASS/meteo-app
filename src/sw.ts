export default null;
declare var self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
  console.log('SW install');
});

self.addEventListener('activate', () => {
  console.log('SW activate');
});