import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAI7Nh5LCPoo9MG2CUcF-Tq1GXzFCDjBBc",
  authDomain: "auth-praktikum-50e2a.firebaseapp.com",
  projectId: "auth-praktikum-50e2a",
  storageBucket: "auth-praktikum-50e2a.firebasestorage.app",
  messagingSenderId: "770323972977",
  appId: "1:770323972977:web:31ada505828c6914ef6cd0",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
