import { useEffect } from "react";
import {requestNotificationPermission} from "./services/utils/notification"
const App = () => {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch(err => console.error("SW registration failed", err));
    }
  }, []); // 👈 IMPORTANT

  useEffect(() => {
    const asked = localStorage.getItem("fcmPermission");
    if (!asked) {
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
