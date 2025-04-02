const CACHE_NAME = 'elite-kicks-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/favicon.ico'
];

const CACHE_STRATEGIES = {
  images: { maxAge: 30 * 24 * 60 * 60 }, // 30 days for images
  assets: { maxAge: 7 * 24 * 60 * 60 },  // 7 days for static assets
  html: { maxAge: 24 * 60 * 60 }         // 1 day for HTML
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle image caching with optimized strategy
  if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return cached response if available and not expired
        if (cachedResponse) {
          const cacheDate = new Date(cachedResponse.headers.get('date'));
          const now = new Date();
          const ageInSeconds = (now - cacheDate) / 1000;
          
          if (ageInSeconds < CACHE_STRATEGIES.images.maxAge) {
            return cachedResponse;
          }
        }
        
        // Otherwise fetch new response and cache it
        return fetch(event.request).then((fetchResponse) => {
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
          }
          
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return fetchResponse;
        }).catch(() => {
          // Return cached response as a fallback, even if expired
          if (cachedResponse) {
            return cachedResponse;
          }
        });
      })
    );
  }
}); 