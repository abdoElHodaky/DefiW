module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{css,png,jpg,ico,html,js,json,txt}'
	],
	navigateFallback:"/offline.html",
	runtimeCaching: [{
    // Routing via a matchCallback function:
    urlPattern: ({request, url}) => url.includes("cdn")==true,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'cdns',
      expiration: {
        maxEntries: 20,
	maxAgeSeconds: 2 * 24 * 60 * 60,
      },
      cacheableResponse:[0,200]
    },
  },{
    urlPattern: ({request, url}) => url.includes("api")==true,
    handler:"NetworkOnly",
    method:"POST",
    options:{
      cacheName:"apCachePost",
      cacheableResponse:[0,200],
      backgroundSync:{
       name:"Apisync",
       options:{
	maxRetentionTime:24*60*2
       }
      }
    }
  }],
   swDest: 'sw.js',
   //swSrc: 'worker.js'
};
