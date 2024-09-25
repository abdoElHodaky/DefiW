importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js'
);

const {registerRoute, NavigationRoute,Route } = workbox.routing;
const {CacheFirst,NetworkOnly,NetworkFirst} = workbox.strategies;
const {CacheableResponse} = workbox.cacheableResponse;
const {ExpirationPlugin}=workbox.ExpirationPlugin
const {BackgroundSyncPlugin,Queue}=workbox.BackgroundSyncPlugin
const {precacheAndRoute} =workbox.precaching
const queue=new Queue("requests")
precacheAndRouge("/manifest.json")
//precacheAndRoute([{"revision":"23d4782fdca7dd73affb72a2f29aa96e","url":"assets/css/appstyle.css"},{"revision":"456e4d2c2304f4430d5fe6471a336997","url":"assets/css/Appstyle.css"},{"revision":"bee0ff537efc357a0e2af0d9b77548ca","url":"assets/css/indexstyle.css"},{"revision":"773cc6d7d4ee349190eee014c929ca61","url":"assets/css/wallet.css"},{"revision":"20aff33ff84ede13674106f1d6de4e80","url":"assets/img/appstorebutton.png"},{"revision":"09a08a27dadf80e25e33d8e3a97afae9","url":"assets/img/background_main.png"},{"revision":"3d477a61ccaae4cd06602adbbdd69d78","url":"assets/img/background.png"},{"revision":"c06dfeee7a86dd175d71205bf56f67f2","url":"assets/img/background2.png"},{"revision":"d0bad5f2ecc1dc93132407e6c4d2fd88","url":"assets/img/background3.png"},{"revision":"1514d0674e2dfdffa8c22decd6b5503b","url":"assets/img/background4.png"},{"revision":"8c6d88bf53cbad391bb2b6ed8db73e7a","url":"assets/img/blog.png"},{"revision":"7633b81b41fdf6747ac156a23eb14a01","url":"assets/img/blog2.png"},{"revision":"d9e8c33d81c8680786d74c459a4f238e","url":"assets/img/bsc.png"},{"revision":"91abcda5d9ed2e3af0e682c1bd870ca9","url":"assets/img/check.png"},{"revision":"19202794613d2a1a84f99ad0e0837164","url":"assets/img/community.png"},{"revision":"ba1881992fec5647d27f05def9c7eb4b","url":"assets/img/community2.png"},{"revision":"c597928071bc1ad0ac737a97cb1334de","url":"assets/img/defi.png"},{"revision":"518ea56b19790664a7a0d8949f558fee","url":"assets/img/earth.png"},{"revision":"f17fedbd959785663515e629eceb61a6","url":"assets/img/earth2.png"},{"revision":"7973e28fa48fbc4143d3d2bc400d5b13","url":"assets/img/googleplaybutton.png"},{"revision":"4646961afc741412eed23764efc4d124","url":"assets/img/image_2021_11_25T18_26_25_492Z.png"},{"revision":"82a45ebcf1db378eefc0c18aa442c686","url":"assets/img/launchpad.png"},{"revision":"83677147ae6108dc336b9ce82a3e9210","url":"assets/img/login_back.jpg"},{"revision":"424c37baf17caa3e9891e2acbf126e19","url":"assets/img/mark1.png"},{"revision":"cef1822d7181b279540beb80e5c0faf4","url":"assets/img/mark2.png"},{"revision":"d839428489d145a4d77ef1f950eefa47","url":"assets/img/moonaddress.jpg"},{"revision":"d27122d284202f41349dcc8f5a527c68","url":"assets/img/moonemail.jpg"},{"revision":"ba3e8a1263ac0a3b5ff750537bb5c91a","url":"assets/img/moonhere.jpg"},{"revision":"e39456eeabc17a76ca22a991ad48147f","url":"assets/img/moonhome.jpg"},{"revision":"32bae1dcea4ef3389ab4dcf2339d02ad","url":"assets/img/moonpayhome.jpg"},{"revision":"1dc58721fce1e38f2a7016b09e92bbdf","url":"assets/img/moonpayselect.jpg"},{"revision":"6852e6a316c0eb2d71d0cc1711f6370c","url":"assets/img/paymentmethod.png"},{"revision":"ef06c3b452d1124762f836315a41bf32","url":"assets/img/phone_large.png"},{"revision":"2317bd7d51a0b3e5f2b26a9fd8720a1d","url":"assets/img/phone_small.png"},{"revision":"056561cffba91ce9d1d4ab0eede7b382","url":"assets/img/presaleLogo.png"},{"revision":"283fec29c01b3061aab9a1950ab6f3b4","url":"assets/img/securitycard.png"},{"revision":"e00b6c030ef08e40c6b565faf9724b50","url":"assets/img/shopping.png"},{"revision":"4c28adadd7aec990c8e3a266585a8a49","url":"assets/img/startsteps.png"},{"revision":"bab841032818760ab94ab8caf379851e","url":"assets/img/step1.png"},{"revision":"3147080c73d2824f2ccf57b3553001b8","url":"assets/img/step2.png"},{"revision":"47d2d23eba7e241911d96408c8e20916","url":"assets/img/step3.png"},{"revision":"2e22bc6072775358d7d0312fad95d592","url":"assets/img/step4.png"},{"revision":"ee3971d2efa798db79e23f63b7a9c3a2","url":"assets/img/step5.png"},{"revision":"578815585c669ed69b665cdb1ccefd4c","url":"assets/img/step6.png"},{"revision":"3ec01de99a871e2796c3e5fad7222d99","url":"assets/img/support.png"},{"revision":"7741b4affe09f85621664aecbf926445","url":"assets/img/tokeninfo.png"},{"revision":"ae21f5e52a897c177d0ffbba8bf45c72","url":"assets/img/touch.png"},{"revision":"279d05e1c61dd4e31c46173397af7ef2","url":"assets/img/tradingcard.png"},{"revision":"cef1822d7181b279540beb80e5c0faf4","url":"favicon.ico"},{"revision":"cef1822d7181b279540beb80e5c0faf4","url":"favicon.png"},{"revision":"cef1822d7181b279540beb80e5c0faf4","url":"favicon32.ico"},{"revision":"cef1822d7181b279540beb80e5c0faf4","url":"favicon32.png"},{"revision":"cef1822d7181b279540beb80e5c0faf4","url":"favicon64.png"},{"revision":"f04659ee51b1a0565859765f38bf3e52","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"b57c141d9a56655385bbc47cb1a48823","url":"manifest.json"},{"revision":"e27621f5c2ed066329626edfe3da9414","url":"offline.html"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"}])
workbox.setConfig({
    debug:true
});
const CACHE="DefiW_Cache";
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
    '/',
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
    return caches.open("offline").then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return cache.match("offline.html");
            } else {
                return matching;
            }
        });
    });
};*/

/*self.addEventListener("fetch", function (event) {
    event.respondWith(checkResponse(event.request).catch(function () {
        return returnFromCache(event.request);
    }));
    if(!event.request.url.startsWith('http')){
        event.waitUntil(addToCache(event.request));
    }
});*/
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
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
