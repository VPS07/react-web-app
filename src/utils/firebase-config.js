import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: "react-web-app-ba546.firebaseapp.com",
  projectId: "react-web-app-ba546",
  storageBucket: "react-web-app-ba546.appspot.com",
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
