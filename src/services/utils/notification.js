import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";
import apiRequest from "../api/apiRequest";


export const requestNotificationPermission = async () => {
    
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BCctoNNU-PnS-vDnkwDQsDSvJaDasGWmEfEJrah_x8InZqbk1YDBi7LE5VCW7ZnqpSgzmkYLZsiVHkpkU-ETZyU",
    });

    await apiRequest("post", "/save-fcm-token", { token });
  }
};
