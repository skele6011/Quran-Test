// // service-worker.js - Leave empty for now
// const cacheName = 'quran-test-cache-v1';
// const urlsToCache = [
//   '/',
//   '/style.css',
//   '/script.js',
//   // Add other static assets here
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       if (cachedResponse) {
//         return cachedResponse;
//       }
//       return fetch(event.request);
//     })
//   );
// });
