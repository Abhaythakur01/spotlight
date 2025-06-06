// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmFDAlvfYfA_JIdOJo0Mkb1riQXeHiNl4",
  authDomain: "spotlight-a7513.firebaseapp.com",
  projectId: "spotlight-a7513",
  storageBucket: "spotlight-a7513.firebasestorage.app",
  messagingSenderId: "928694743277",
  appId: "1:928694743277:web:e7346d23ead3351c461ce4",
  measurementId: "G-3032Y8NPNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);