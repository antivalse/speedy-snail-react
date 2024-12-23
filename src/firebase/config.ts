/* Firebase Config */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from "firebase/firestore";
import { UserInfo } from "../types/User.types";
import { Image } from "../types/Image.types";
import { Category } from "../types/Category.types";
import { Schedule } from "../types/Schedule.types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

// Firebase collections
const createCollection = <T = DocumentData>(collectionType: string) => {
  return collection(db, collectionType) as CollectionReference<T>;
};

export const categoriesCollection = createCollection<Category>("categories");
export const defaultImagesCollection = createCollection<Image>("defaultImages");
export const imagesCollection = createCollection<Image>("images");
export const schedulesCollection = createCollection<Schedule>("schedules");
export const usersCollection = createCollection<UserInfo>("users");

export default app;
