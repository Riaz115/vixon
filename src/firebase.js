
import { initializeApp } from "firebase/app";
import { getMessaging, } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyCFPFlgXP3_XDgR6euDK7EXglaP5xZOYcc",
  authDomain: "community-translate-433120.firebaseapp.com",
  projectId: "community-translate-433120",
  databaseURL: "https://community-translate-433120-default-rtdb.firebaseio.com",
  storageBucket: "community-translate-433120.appspot.com",
  messagingSenderId: "1067922740345",
  appId: "1:1067922740345:web:01fd48d92990c64bedb0a8"
};

const app = initializeApp(firebaseConfig);
export const messaging  = getMessaging(app);








