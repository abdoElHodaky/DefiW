importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
/*importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js'
); */

const {registerRoute, NavigationRoute,Route } = workbox.routing;
const {CacheFirst,NetworkOnly,NetworkFirst} = workbox.strategies;
const {CacheableResponse} = workbox.cacheableResponse;
const {ExpirationPlugin}=workbox.ExpirationPlugin
const {BackgroundSyncPlugin,Queue}=workbox.BackgroundSyncPlugin
const queue=new Queue("requests")
workbox.setConfig({
    debug:true
});
const CACHE="DEFIW_Cache";
const preLoad = function () {
    return caches.open(CACHE).then(function (cache) {
        // caching index and important routes
        return cache.addAll(filesToCache);
    });
};

self.addEventListener("install", function (event) {
    event.waitUntil(preLoad());
});



const filesToCache = [
    "/",
    '/offline.html'
];

const checkResponse = function (request) {
    return new Promise(function (fulfill, reject) {
        fetch(request).then(function (response) {
            if (response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

const addToCache = function (request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
};

/*const returnFromCache = function (request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return cache.match("offline.html");
            } else {
                return matching;
            }
        });
    });
};
*/
workbox.recipes.imageCache();
 workbox.recipes.staticResourceCache();
 workbox.recipes.googleFontsCache();
 workbox.recipes.offlineFallback();
/*self.addEventListener("fetch", function (event) {
    event.respondWith(checkResponse(event.request).catch(function () {
        return returnFromCache(event.request);
    }));
    if(!event.request.url.startsWith('http')){
        event.waitUntil(addToCache(event.request));
    }
});*/
 
/*if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
/*self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match("offline.html");
        return cachedResp;
      }
    })());
  }
});*/

self.addEventListener('fetch', (event) => {
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
/*
const networkWithFallbackStrategy = new NetworkOnly({
  networkTimeoutSeconds: 5,
  plugins: [
    {
      handlerDidError: async () => {
        return await caches.match("offline.html", {
          cacheName: CACHE,
        });
      },
    },
  ],
});

// Register the route to handle all navigations.
registerRoute(new NavigationRoute(networkWithFallbackStrategy));
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    plugins: [new CacheableResponsePlugin({statuses: [0, 200]}),
              new ExpirationPlugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 }),
             ],
  })
);
registerRoute(
  ({request}) => request.destination === 'style',
  new CacheFirst({
    cacheName:"styles",
    plugins: [new CacheableResponsePlugin({statuses: [0, 200]}),
              new ExpirationPlugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 }),
             ],
  })
);
registerRoute(
  ({request}) => request.destination === 'script',
  new CacheFirst({
      cacheName:"scripts",
      plugins: [new CacheableResponsePlugin({statuses: [0, 200]}),
              new ExpirationPlugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 ,
              
              }),
             ],
  })
);

*/
registerRoute(
  new Route(({url}) => {
  return url.includes("cdn") == true;
}, new NetworkFirst({
  cacheName:"cdns",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200]
    }),
      new ExpirationPlugin({
       maxEntries: 60,
       maxAgeSeconds: 30 * 24 * 60 * 60 ,
       purgeOnQuotaError: true
        })
  ]
}))
);
