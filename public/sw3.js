importScripts('/workbox/workbox-v7.1.0/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/workbox/workbox-v7.1.0/',
  debug:true
});
workbox.loadModule("workbox-routing")
