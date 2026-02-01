import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";
import apiRequest from "../api/apiRequest";


export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") return;

  const token = await getToken(messaging, {
    vapidKey: "BCctoNNU-PnS-vDnkwDQsDSvJaDasGWmEfEJrah_x8InZqbk1YDBi7LE5VCW7ZnqpSgzmkYLZsiVHkpkU-ETZyU",
  });

  if (!token) return;

  const savedToken = localStorage.getItem("fcmToken");

  // 👇 agar same token hai toh API call mat karo
  if (savedToken === token) return;

  localStorage.setItem("fcmToken", token);

  await apiRequest("post", "/save-fcm-token", { token });
};
