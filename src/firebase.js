import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBa_GW6H3cwzKcE_pgZFI5rMxN5g_mgs5M",
  authDomain: "chat-f87d5.firebaseapp.com",
  projectId: "chat-f87d5",
  storageBucket: "chat-f87d5.appspot.com",
  messagingSenderId: "80984394952",
  appId: "1:80984394952:web:4eed65f7e55722055869fd"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();