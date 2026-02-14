importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
   apiKey:"AIzaSyApk5tnJwvSXlSap0h130Ot_E_Eq0EiEPU",
  authDomain:"bajajpanel-893b8.firebaseapp.com",
  projectId:"bajajpanel-893b8",
  messagingSenderId:"114632362192",
  appId:"1:114632362192:web:8004c8e035c91b8168f6d5",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // console.log("Background message received:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
     
    }
  );
});
