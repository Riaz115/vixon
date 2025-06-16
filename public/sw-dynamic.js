
self.addEventListener('install', (event) => {
  // //console.log('Dynamic Service Worker installed.');
  
  // Get the manifestId from the event, or pass it dynamically
  const manifestId = new URL(self.location).searchParams.get('manifestId') || 'default';
  const dynamicCacheName = `dynamic-cache-${manifestId}`;
  
  event.waitUntil(
    caches.open(dynamicCacheName).then((cache) => {
      return cache.addAll([
        `/fallback-${manifestId}.html`, // Ensure a unique fallback file for each card
        // Other essential files specific to each card, based on manifestId
      ]).catch(err => {
        console.error('Cache installation failed:', err);
      });
    })
  );
});

// Listen for the 'activate' event
self.addEventListener('activate', (event) => {
  // //console.log('Service Worker activated.');
  
  const manifestId = new URL(self.location).searchParams.get('manifestId') || 'default';
  const cacheWhitelist = [`dynamic-cache-${manifestId}`];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // //console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Listen for the 'fetch' event
self.addEventListener('fetch', (event) => {
  const { request } = event;

  let url;
  try {
    url = new URL(request.url);
  } catch (e) {
    console.error('Invalid URL:', request.url, e);
    return;
  }

  // Check if the protocol is supported
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    // //console.log('Ignoring unsupported protocol:', url.protocol);
    return;
  }

  // Check for cross-origin requests
  if (url.origin !== self.location.origin) {
    // //console.log('Ignoring cross-origin request:', url.origin);
    return;
  }

  // Identify the manifest or card-specific cache
  const manifestId = new URL(self.location).searchParams.get('manifestId') || 'default';
  const dynamicCacheName = `dynamic-cache-${manifestId}`;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // //console.log('Serving from cache:', request.url);
        return cachedResponse;
      }

      // If not in cache, fetch from network
      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          // //console.log('Not caching response:', request.url);
          return networkResponse;
        }

        // Cache the network response for future requests
        const responseClone = networkResponse.clone();
        caches.open(dynamicCacheName).then((cache) => {
          cache.put(request, responseClone).catch((err) => {
            console.error('Failed to cache response:', err);
          });
        }).catch((err) => {
          console.error('Failed to open cache:', err);
        });

        return networkResponse;
      }).catch((error) => {
        console.error('Network request failed:', error);
        return caches.match(`/fallback-${manifestId}.html`);
      });
    }).catch((error) => {
      console.error('Fetch failed, serving fallback:', error);
      return caches.match(`/fallback-${manifestId}.html`);
    })
  );
});

// self.addEventListener('install', (event) => {
//     // //console.log('Dynamic Service Worker installed.');

//     event.waitUntil(
//       caches.open('dynamic-cache').then((cache) => {
//         return cache.addAll([
         
//         ]);
//       })
//     );
//   });
  
//   self.addEventListener('activate', (event) => {
//     // //console.log('Service Worker activated.');
//   });
  
//   self.addEventListener('fetch', (event) => {
//     // //console.log('Dynamic Service Worker fetching:', event.request.url);
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request).then((response) => {
//           return caches.open('dynamic-cache').then((cache) => {
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         });
//       }).catch(() => {
//         return caches.match('/fallback.html');
//       })
//     );
//   });
  


// self.addEventListener('fetch', (event) => {
//   const requestUrl = new URL(event.request.url);

//   // Ignore chrome-extension and non-HTTP(S) requests
//   if (requestUrl.protocol === 'chrome-extension:' || requestUrl.protocol !== 'http:' && requestUrl.protocol !== 'https:') {
//     return;
//   }

//   // Check if the request URL contains '/cardinstallation/' to extract the card ID
//   if (requestUrl.pathname.includes('/cardinstallation/')) {
//     const cardId = getCardIdFromUrl(requestUrl);

//     // Define a unique cache name for each card
//     const cacheName = `dynamic-cache-${cardId}`;

//     // //console.log(`Fetching resource for card: ${cardId}, URL: ${event.request.url}`);

//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request).then((response) => {
//           return caches.open(cacheName).then((cache) => {
//             // Cache the response for this card
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         });
//       }).catch(() => {
//         // Serve a fallback page if resource is not available
//         return caches.match('/fallback.html');
//       })
//     );
//   } else {
//     // For non-card related requests, use default caching strategy
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });

// // Utility function to extract card ID from the URL
// function getCardIdFromUrl(requestUrl) {
//   // Assuming cardId is part of the URL, e.g., /cardinstallation/{id}/
//   const pathParts = requestUrl.pathname.split('/');
//   // //console.log(pathParts, "this is path");
  
//   const cardIdIndex = pathParts.indexOf('cardinstallation');
//   if (cardIdIndex > -1 && cardIdIndex < pathParts.length - 1) {
//     return pathParts[cardIdIndex + 1];
//   }
  
//   return 'default'; // If no cardId is found, return 'default'
// }



// Fetch event listener for handling requests and caching responses.
// Install event
// Install event
// sw-dynamic.js

// Install event
// Listen for the 'install' event