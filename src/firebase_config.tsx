import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-T8S3KDYdqZHac3V0JoNWusTrdNgGgoA",
  authDomain: "lawyerconsultancy-48c77.firebaseapp.com",
  projectId: "lawyerconsultancy-48c77",
  storageBucket: "lawyerconsultancy-48c77.appspot.com",
  messagingSenderId: "943791890436",
  appId: "1:943791890436:web:10e850830ac212e2fb1551",
  measurementId: "G-SE8QLM2TV4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// auth.languageCode = 'it';