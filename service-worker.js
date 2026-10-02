// Arusuvai Service Worker
// Version: v1.0.1
// Handles offline caching and detects new Arusuvai versions.
// All apps share one GitHub Pages origin (and one Cache Storage),
// so every cache this app owns starts with this prefix.
const CACHE_PREFIX = "arusuvai-";
const CACHE_NAME = CACHE_PREFIX + "v1.0.3-shell";

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './pwa-192x192.png',
  './pwa-512x512.png',
  './pwa-maskable-512x512.png',
  './readme.md',
  './readme.html',
  './privacy.html',
  './terms.html',
  './LICENSE'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('arusuvai-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Look up a request ONLY in Arusuvai's own cache.
// (caches.match() would search every cache on the shared origin.)
async function ownCacheMatch(request) {
  const cache = await caches.open(CACHE_NAME);
  return cache.match(request, { ignoreSearch: true });
}

// Always resolve with a real Response (never undefined/throw), so the
// page can never go blank when the network fails.
async function offlineFallback(cachedResponse, isShell) {
  if (cachedResponse) return cachedResponse;

  if (isShell) {
    const shell = await ownCacheMatch('./index.html');
    if (shell) return shell;
  }

  return new Response('Offline and nothing cached yet. Please reload.', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' }
  });
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await ownCacheMatch(request);
    return offlineFallback(cached, true);
  }
}

async function cacheFirst(request) {
  const cached = await ownCacheMatch(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return offlineFallback(null, true);
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  // Never intercept cross-origin requests such as Google APIs or Google Identity Services.
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Keep navigation/index.html network-first so hosted updates can be picked up
  // without requiring a cache-name change.
  if (request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});
