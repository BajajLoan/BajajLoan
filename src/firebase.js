import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey:"AIzaSyApk5tnJwvSXlSap0h130Ot_E_Eq0EiEPU",
  authDomain:"bajajpanel-893b8.firebaseapp.com",
  projectId:"bajajpanel-893b8",
  messagingSenderId:"114632362192",
  appId:"1:114632362192:web:8004c8e035c91b8168f6d5",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
