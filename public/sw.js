"use strict";var workboxVersion="6.3.0";importScripts("https://storage.googleapis.com/workbox-cdn/releases/".concat(workboxVersion,"/workbox-sw.js")),workbox.core.setCacheNameDetails({prefix:"ChangLu's Blog"}),workbox.core.skipWaiting(),workbox.core.clientsClaim(),workbox.precaching.precacheAndRoute([{revision:"67c5836ac21c08a83dd589b782d3e81a",url:"./2021/10/10/hello-world/index.html"},{revision:"95357bff01f5679ae6544a729f9b1c24",url:"./archives/2021/10/index.html"},{revision:"194c396c6680207e6556338b8a12461e",url:"./archives/2021/index.html"},{revision:"4a0a5ae87408d5d496b5533bef6a9bc3",url:"./archives/index.html"},{revision:"2574ea6cc30706c1799652989ff710b1",url:"./categories/index.html"},{revision:"496af8fe77705a0326f76f47917cabaa",url:"./css/color@1.0.0.css"},{revision:"6df70348cb731da7eef9a63a72c7fe9c",url:"./css/custom@1.0.0.css"},{revision:"35f24b943dc35fdf62104453dab90293",url:"./css/index.css"},{revision:"bb4e9eaf97c3977c15388ead01721dfe",url:"./css/timepiece.css"},{revision:"d41d8cd98f00b204e9800998ecf8427e",url:"./css/var.css"},{revision:"d0cc8926d89f7480c16fa4966eea115d",url:"./img/siteicon/manifest.json"},{revision:"1e8b47cddcb305e7f4af698c2c829524",url:"./index.html"},{revision:"4bbe464dd928dc7958c3941d8ced25aa",url:"./js/color-thief.js"},{revision:"240e062def7897dd4c03a12bf07fdc65",url:"./js/main.js"},{revision:"533d980c0d50a0d0d7fe34c41a3e2100",url:"./js/search/algolia.js"},{revision:"33b3c0e197c029d5b198059220bbd5ab",url:"./js/search/local-search.js"},{revision:"65b819860b77c7ebd6c00ddce2bd2115",url:"./js/timepiece.js"},{revision:"b3810513e04b13b2d18c6b779c883f85",url:"./js/tw_cn.js"},{revision:"12cef07c2e9bc8841a5380df4fd342f5",url:"./js/utils.js"},{revision:"5fe76e25054678313328bdf6e791568d",url:"./link/index.html"},{revision:"2303f737a838010dd7113f570d778138",url:"./pwa/manifest.json"},{revision:"2d87976e737d8fbf58eed9ee2272fbcc",url:"./tags/index.html"}],{directoryIndex:null}),workbox.precaching.cleanupOutdatedCaches(),workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,new workbox.strategies.CacheFirst({cacheName:"images",plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:1e3,maxAgeSeconds:2592e3}),new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]})]})),workbox.routing.registerRoute(/\.(?:eot|ttf|woff|woff2)$/,new workbox.strategies.CacheFirst({cacheName:"fonts",plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:1e3,maxAgeSeconds:2592e3}),new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]})]})),workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new workbox.strategies.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets"})),workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new workbox.strategies.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:1e3,maxAgeSeconds:2592e3}),new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]})]})),workbox.routing.registerRoute(/^https:\/\/cdn\.jsdelivr\.net/,new workbox.strategies.CacheFirst({cacheName:"static-libs",plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:1e3,maxAgeSeconds:2592e3}),new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]})]})),workbox.googleAnalytics.initialize();