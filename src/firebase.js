import firebase from "firebase/app";
import "firebase/database";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyASUPf4JfP_YfyqDM1wD89B_Sivbo4PIjU",

  authDomain: "zoltan-ce757.firebaseapp.com",

  projectId: "zoltan-ce757",

  storageBucket: "zoltan-ce757.firebasestorage.app",

  messagingSenderId: "474123952600",

  appId: "1:474123952600:web:87f13344dc20a0215092ad",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
