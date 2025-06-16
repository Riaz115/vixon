
// // Import Firebase scripts (use compat versions)
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCFPFlgXP3_XDgR6euDK7EXglaP5xZOYcc",
  authDomain: "community-translate-433120.firebaseapp.com",
  projectId: "community-translate-433120",
  databaseURL: "https://community-translate-433120-default-rtdb.firebaseio.com",
  storageBucket: "community-translate-433120.appspot.com",
  messagingSenderId: "1067922740345",
  appId: "1:1067922740345:web:01fd48d92990c64bedb0a8"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
 
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/apple.png', 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
