import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5LdAtLnZit4C9uXcT7je1OFp__KUe7AI",
  authDomain: "physical-ai.firebaseapp.com",
  projectId: "physical-ai",
  storageBucket: "physical-ai.firebasestorage.app",
  messagingSenderId: "373978097788",
  appId: "1:373978097788:web:d52b15b498aec2fad0c1f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;