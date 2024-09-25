self.importScripts('/workbox/workbox-v7.1.0/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/workbox/workbox-v7.1.0/',
  debug:true
});
workbox.loadModule("workbox-routing")
workbox.loadModule("workbox-recipes")
workbox.loadModule("workbox-background-sync")
workbox.loadModule("workbox-strategies")
workbox.loadModule("workbox-Expiration-plugin")

workbox.routing.registerRoute(
  ({request}) => request.url.includes("cdn") === 'true',
  new workbox.startegies.CacheFirst({
    cacheName: 'cdns',
    plugins: [
      new workbox.ExpirationPlugin.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds:  24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

const queue = new workbox.BackgroundSync.Queue('ApiQueue');

self.addEventListener('fetch', event => {
  // Add in your own criteria here to return early if this
  // isn't a request that should use background sync.
  if (event.request.method !== 'POST') {
    return;
  }

  const bgSyncLogic = async () => {
    try {
      const response = await fetch(event.request.clone());
      return response;
    } catch (error) {
      await queue.pushRequest({request: event.request});
      return error;
    }
  };

  event.respondWith(bgSyncLogic());
});

