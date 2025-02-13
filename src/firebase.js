// firebase.js

// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASUPf4JfP_YfyqDM1wD89B_Sivbo4PIjU",
  authDomain: "zoltan-ce757.firebaseapp.com",
  databaseURL: "https://zoltan-ce757-default-rtdb.firebaseio.com",
  projectId: "zoltan-ce757",
  storageBucket: "zoltan-ce757.appspot.com",
  messagingSenderId: "474123952600",
  appId: "1:474123952600:web:87f13344dc20a0215092ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database service
const database = getDatabase(app);
// Export the necessary database functions
export { app, database };
