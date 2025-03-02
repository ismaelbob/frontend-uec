/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Devuelva falso para eximir las solicitudes de ser cumplidas por index.html.
  ({ request, url }) => {
    // Si esto no es una navegación, omita.
    if (request.mode !== 'navigate') {
      return false;
    } // Si esta es una URL que comienza con / _, omítala.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // Si parece una URL para un recurso, porque contiene // una extensión de archivo, omita.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Devuelve verdadero para indicar que queremos usar el controlador.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Un ejemplo de ruta de almacenamiento en caché en tiempo de ejecución para solicitudes que no son manejadas por el 
// precaché, en este caso solicitudes .png del mismo origen como las de public /
registerRoute(
  // Agregue cualquier otra extensión de archivo o criterio de enrutamiento según sea necesario.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Personalice esta estrategia según sea necesario, por ejemplo, cambiando a CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Asegúrese de que una vez que esta caché en tiempo de ejecución alcance un tamaño máximo, 
      // se eliminen las imágenes utilizadas menos recientemente.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// Esto permite que la aplicación web active skipWaiting a través de registration
// .waiting.postMessage ({tipo: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Cualquier otra lógica de service worker personalizado puede ir aquí.
const datosCanciones = [
  'https://uecapi.elementfx.com/himjovenes/getcanciones.php',
  'https://uecapi.elementfx.com/himpoder/getcanciones.php',
  'https://uecapi.elementfx.com/himverde/getcanciones.php',
  'https://uecapi.elementfx.com/cronograma/getTurnoMensual.php',
  'https://uecapi.elementfx.com/cronograma/getTurnoJovenes.php'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('memoria-v1').then(cache => {
      return cache.addAll(datosCanciones);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(networkResponse => {
      // Verificar si la respuesta de la red es válida
      if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
        return caches.match(event.request);
      }

      // Clonar la respuesta de la red
      const networkResponseClone = networkResponse.clone();

      // Comparar los datos de la red con los datos en caché
      return caches.open('memoria-v1').then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          if (!cachedResponse || !responsesAreEqual(cachedResponse, networkResponseClone)) {
            cache.put(event.request, networkResponseClone);
          }
          return networkResponse;
        });
      });
    }).catch(() => {
      // Si la red falla, devolver la respuesta en caché
      return caches.match(event.request);
    })
  );
});

// Función para comparar dos respuestas
function responsesAreEqual(response1, response2) {
  return response1.headers.get('content-length') === response2.headers.get('content-length') &&
         response1.headers.get('etag') === response2.headers.get('etag');
}