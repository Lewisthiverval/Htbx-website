import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2BiSk16YhnPLkX_fOkS2vtPFZYv4SP84",
  authDomain: "htbx-64355.firebaseapp.com",
  projectId: "htbx-64355",
  storageBucket: "htbx-64355.appspot.com",
  messagingSenderId: "809096179386",
  appId: "1:809096179386:web:27a16af916e66d23c0dc83",
  measurementId: "G-82KQCDDKNE",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
