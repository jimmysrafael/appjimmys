const cacheName = 'Jimmys'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function (cache){
            cache.addAll([
                './',
                './index.html',
                './manifest.webmanifest',
                './index.js',
                '/jquery-3.1.1.min.js',
                '/img/jr-acenando.png',
                '/img/jr-boca-aberta.png',
                '/img/jr-coracao.png',
                '/img/jr-raiva.png',
                '/img/jr-sem-jeito.png',
                '/img/logo-jimmys.png',
                '/css/all.min.css',
                '/css/stylw.css',
                '/webfonts/fa-solid-900.woff2',
                '/webfonts/fa-brands-400.woff2',
                '/webfonts/fa-brands-400.ttf',
                '/control/foto.html',
                '/ajax/foto.js'

            ])
        })
    )
    return self.skipWaiting()
})

self.addEventListener('activate', e =>{
    self.clients.claim()
})

self.addEventListener('fetch', async e =>{
    const req = e.request
    const url = new URL(req.url)

    if(url.origin === location.origin){
        e.respondWith(cacheFirst(req))
    } else{
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req){
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)

    return cached || fetch(req)
}

async function networkAndCache(req){
    const cache = await caches.open(cacheName);
    try{
        const refresh = await fetch(req)
        await cache.put(req, fresh.clone())
        return refresh
    } catch(e){
        const cached = await cache.match(req);
        return cached
    }
}