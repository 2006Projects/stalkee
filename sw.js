// sw.js
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {
        title: "Stalkee",
        body: "Quelqu'un veut analyser une conversation en ce moment :)"
    };

    const options = {
        body: data.body,
        icon: '/assets/og-preview.png', // Remplace par ton icône
        badge: '/assets/og-preview.png',
        vibrate: [200, 100, 200],
        data: { url: self.location.origin }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});