import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3ZWp5iX0M2Uxkg5Xa2oHwiMI-yQhENNQ",
  authDomain: "stock-7b987.firebaseapp.com",
  projectId: "stock-7b987",
  storageBucket: "stock-7b987.appspot.com",
  messagingSenderId: "847229067185",
  appId: "1:847229067185:web:0f83da557ab1d0972fa790",
  measurementId: "G-VV1F09TNZG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
