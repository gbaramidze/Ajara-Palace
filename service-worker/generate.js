const fs = require("fs");
const { generate, toTime } = require("./helpers");
const lifeTime = process.env.STATE_CACHE_LIFETIME
  ? toTime(process.env.STATE_CACHE_LIFETIME)
  : toTime("3m");
const write = `importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
if(workbox) {
  try {
    workbox.setConfig({ debug: false });
    const {
      routing: {
        registerRoute
      },
      strategies: {
        CacheFirst, 
        NetworkFirst
      }, 
      cacheableResponse: {
        CacheableResponsePlugin
      },
      expiration: {
        ExpirationPlugin
      }
    } = workbox;
        
    workbox.core.skipWaiting();
    
    var networkFirst = new NetworkFirst({
      cacheName: 'cache-pages' ,
      plugins: [ 
        new ExpirationPlugin({
          maxAgeSeconds: ${lifeTime},
        }),
      ],
    });
        
    const offlinePage = '/';
    const customHandler = async (args) => {
      try {
        const response = await networkFirst.handle(args);
        return response || await caches.match(offlinePage);
      } catch (error) {
        return await caches.match(offlinePage);
      }
    };
    
    registerRoute(
      ({url}) => location.origin === url.origin && url.pathname.match(/(.*)\\/\\w{2}\\/(.*)/g), 
      customHandler
    );
    
    registerRoute(
      ({url}) => url.origin === location.origin && url.pathname.match(/(.js$|.css$)/g),
      new CacheFirst({
        cacheName: 'static',
        plugins: [
            new ExpirationPlugin({
            maxAgeSeconds: ${toTime("1d")},
          }),
        ]
      })
    );
    
    registerRoute(
      ({url}) => url.origin === location.origin && url.pathname.match(/(.woff|.woff2|.ttf|.oet)/), 
      new CacheFirst({
        cacheName: 'fonts',
        plugins: [
            new ExpirationPlugin({
            maxAgeSeconds: ${toTime("1d")},
          }),
        ]
      })
    );
    
    registerRoute(
        ({url}) => url.pathname.match(/(image.php|.*(png|jpg|jpeg|svg|gif))/g),
      new CacheFirst({
        cacheName: 'images',
        plugins: [
          new ExpirationPlugin({
            maxAgeSeconds: ${toTime("1d")},
          }),
          new CacheableResponsePlugin({
            statuses: [0, 200]
          }),
        ]
      })
    );
    
    registerRoute(
      ({url}) => location.origin === url.origin && url.pathname.indexOf("/ajax/") > -1, 
      new NetworkFirst({
        cacheName: 'api',
        plugins: [
            new ExpirationPlugin({
            maxAgeSeconds: ${lifeTime}
          }),
        ]
      })
    );
    
    self.addEventListener('install', () => {
      caches.delete('static');
    });
    
    self.addEventListener('activate', (event) => {
      var bundles = ${JSON.stringify(generate())};
      let isIn = false;
      event.waitUntil(
        bundles.forEach(bundle => {
          const {name, data} = bundle;
          isIn = false;
          caches.has(name).then(function(boolean) {
            isIn = true;
          });
          if(!isIn) {
            caches.open(name).then(function(cache) {
              return data.map(item=> cache.add(item));
            })
            isIn = false;
          }
        })
      );
    });
  } catch(warn) {
    console.warn('Service-worker', warn); 
  }
}
`;

const location = "./dist";

try {
  if (!fs.existsSync(location)) {
    fs.mkdirSync(location);
  }
  fs.writeFileSync(`${location}/service-worker.js`, write);
  console.log("Service-worker was created");
} catch (e) {
  console.log("error with Service-worker", e);
}
