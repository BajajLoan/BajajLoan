import { useEffect } from "react";
import AppStack from "./navigation/AppStack"
import {requestNotificationPermission} from "./services/utils/notification"
const App = () => {

 useEffect(() => {
    const registerSW = async () => {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("Service Worker registered");

        // 🔥 yahin se token generate call karo
        requestNotificationPermission(registration);
      }
    };

    registerSW();
  }, []);

  return <AppStack />;
};

export default App;
