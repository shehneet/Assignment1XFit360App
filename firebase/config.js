import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3uzSFXEbpA0KyD0D0UndeFjDG2flo328",
  authDomain: "xfit360-cdd96.firebaseapp.com",
  projectId: "xfit360-cdd96",
  storageBucket: "xfit360-cdd96.firebasestorage.app",
  appId: "1:1033253813884:android:8a950d23210ca7755413f9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
