const cacheName = 'v1';
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      )
    })
  )
});
