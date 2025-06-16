self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Check if the request is cross-origin
  if (url.origin !== location.origin) {
    // Handle cross-origin requests here
    event.respondWith(
      fetch(event.request).then(response => {
        // Return the fetched resource for cross-origin requests
        return response;
      }).catch(err => {
        console.error('Failed to fetch cross-origin resource:', err);
        return caches.match('/fallback.png'); // Optional: return a fallback image or resource
      })
    );
  } else {
    // Handle same-origin requests with caching
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request).then(networkResponse => {
          return caches.open('dynamic-cache').then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});

