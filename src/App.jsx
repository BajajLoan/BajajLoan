
import { useEffect } from "react";
import AppStack from "./navigation/AppStack";
import { requestNotificationPermission } from "./services/utils/notification";


const App = () => {

  if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("SW registration failed", err));
}
  useEffect(()=>{
      requestNotificationPermission()
  },[])

  return  <AppStack />
};

export default App;
