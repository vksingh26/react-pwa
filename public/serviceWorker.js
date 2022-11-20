const CACHE_NAME = 'version-1.0';
const cacheUrl = ['index.html', 'offline.html'];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(cacheUrl);
        })
    )
})

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            return fetch(event.request).catch(() => caches.match('offline.html'));
        })
    )
})

this.addEventListener('activate', (event) => {
    const cacheWhielist = [];
    cacheWhielist.push(CACHE_NAME);
    event.waitUntil(caches.keys().then((cachesNames) => Promise.all(
        cachesNames.map((cacheName) => {
            if (!cacheWhielist.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        })
    )))
})