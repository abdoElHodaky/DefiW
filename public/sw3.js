importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

const {registerRoute} = workbox.routing;
const {CacheFirst} = workbox.strategies;
const {CacheableResponse} = workbox.cacheableResponse;

registerRoute(
  ({request}) => request.url.includes("cdn") === true,
  new CacheFirst({
    plugins: [
      cacheName:"cdns",
      new CacheableResponsePlugin({statuses: [0, 200]})],
  })
);
