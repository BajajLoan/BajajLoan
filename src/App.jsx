import { useEffect } from "react";
import AppStack from "./navigation/AppStack"
import {requestNotificationPermission} from "./services/utils/notification"
const App = () => {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("public/firebase-messaging-sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch(err => console.error("SW registration failed", err));
    }
  }, []);

  useEffect(() => {
    const asked = localStorage.getItem("fcmPermission");
    if (!asked) {
      console.log("hello token")
      requestNotificationPermission()
        .then(() => {
          localStorage.setItem("fcmPermission", "true");
        })
        .catch(() => {});
    }
  }, []);

  return <AppStack />;
};

export default App;
