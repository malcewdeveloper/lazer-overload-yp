/* global navigator, window, self, caches, console, fetch */

const CACHE_NAME = "lazer-overload-cache-v1";
const URLS = ["src/main.tsx"];

function startServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log(
                        "ServiceWorker registration successful with  scope: ",
                        registration.scope,
                    );
                })
                .catch((error) => {
                    console.log("ServiceWorker registration failed: ", error);
                });
        });
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cashe");
                return cache.addAll(URLS);
            })
            .catch((error) => {
                console.log(error);
                throw error;
            }),
    );
});

// Перехват запросов и работа с кэшом
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Возвращаем ресурс из кэша
                }

                // Если ресурса нет в кэше, делаем запрос на сервер
                return fetch(event.request).then((networkResponse) => {
                    // Проверяем, был ли ответ корректным
                    if (
                        !networkResponse ||
                        networkResponse.status !== 200 ||
                        networkResponse.type !== "basic"
                    ) {
                        return networkResponse;
                    }

                    // Кэшируем новый ресурс
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                });
            })
            .catch((error) => {
                console.error(
                    "Fetch failed; returning offline page instead.",
                    error,
                );
                // Здесь можно вернуть специальную офлайн-страницу или другой ресурс
            }),
    );
});

// Активация нового Service Worker и удаление старых кэшей
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(
                            "[Service Worker] Deleting old cache:",
                            cacheName,
                        );
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
});

startServiceWorker();
