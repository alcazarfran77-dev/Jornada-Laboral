/* Service worker: cachea el cascarón de la app (HTML/manifest/íconos) para que abra
   más rápido y funcione sin conexión. La cámara, el GPS, Face-api.js y el envío a
   nómina SIEMPRE necesitan conexión: no se cachean aquí.

   IMPORTANTE: cuando subas cambios al código de la app, sube también el número
   de versión de abajo (v1 -> v2, etc.). Si no lo haces, los teléfonos que ya
   instalaron la app pueden tardar una recarga extra en ver la versión nueva. */
const CACHE = 'jornada-ia-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png', './icons/favicon.svg'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Solo controla el cascarón (mismo origen). Todo lo demás —cámara, GPS, la CDN
  // de Face-api.js/QR, el envío a tu sistema de nómina— va siempre directo a la red.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || network; // cache primero para que abra al instante; se actualiza en segundo plano
    })
  );
});
