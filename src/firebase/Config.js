import  firebase  from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgdy9yG3aEw8FNUiZDy1KIDJVmWPjhrkA",
  authDomain: "rattrapge-js.firebaseapp.com",
  projectId: "rattrapge-js",
  storageBucket: "rattrapge-js.appspot.com",
  messagingSenderId: "160680756906",
  appId: "1:160680756906:web:398edd51bcab9616f432d3"
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
