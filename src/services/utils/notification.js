import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";
import apiRequest from "../api/apiRequest";



const clearOldPushSubscription = async (serviceWorkerRegistration) => {
  const subscription = await serviceWorkerRegistration.pushManager.getSubscription();
  if (subscription) {
    console.log("Old push subscription found, unsubscribing...");
    await subscription.unsubscribe();
  }
};


export const requestNotificationPermission = async (serviceWorkerRegistration) => {
  // console.log("Requesting permission...");

  const permission = await Notification.requestPermission();
  // console.log("Permission:", permission);
await clearOldPushSubscription(serviceWorkerRegistration);
  if (permission !== "granted") return;

  const token = await getToken(messaging, {
    vapidKey: "BCctoNNU-PnS-vDnkwDQsDSvJaDasGWmEfEJrah_x8InZqbk1YDBi7LE5VCW7ZnqpSgzmkYLZsiVHkpkU-ETZyU",
    serviceWorkerRegistration, // 🔥 MOST IMPORTANT LINE
  });

  // console.log("FCM TOKEN:", token);

  if (!token) {
    console.log("Token not generated");
    return;
  }

  const savedToken = localStorage.getItem("fcmToken");
  if (savedToken === token) return;

  localStorage.setItem("fcmToken", token);

  await apiRequest("post", "/save-fcm-token", { token });
};