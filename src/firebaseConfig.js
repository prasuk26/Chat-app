import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAsTbEBtZD-LMDCbINj4x45edUgmMlL7D8",
  authDomain: "chat-app2607.firebaseapp.com",
  projectId: "chat-app2607",
  storageBucket: "chat-app2607.appspot.com",
  messagingSenderId: "549644954684",
  appId: "1:549644954684:web:12570d8b3060d7a465e739",
  measurementId: "G-K57ZCQ0NHK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);