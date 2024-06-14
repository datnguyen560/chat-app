

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyA96Lhu4z5cyVDxZjbd4aJE7UHmx7oqJdQ",
  authDomain: "chat-app-e55bc.firebaseapp.com",
  projectId: "chat-app-e55bc",
  storageBucket: "chat-app-e55bc.appspot.com",
  messagingSenderId: "534955725068",
  appId: "1:534955725068:web:250506b5bfdd7384e97929",
  measurementId: "G-FXC8ZC1XDV"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

// const db = firebase.firestore();

// export {db, auth};
// export default firebase;