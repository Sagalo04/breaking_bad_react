import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

/**
 * Config
 */
const firebaseConfig = {
  apiKey: "AIzaSyBkajIz1Gdv0pLf4q3FoHR1X7WWpcx6_v4",
  authDomain: "breakingbadreact.firebaseapp.com",
  projectId: "breakingbadreact",
  storageBucket: "breakingbadreact.appspot.com",
  messagingSenderId: "665149928349",
  appId: "1:665149928349:web:fafc65875e6a475428f574",
  measurementId: "G-8BS0SECFCE",
};
firebase.initializeApp(firebaseConfig);

/**
 * Database
 */
const db = firebase.firestore().collection("Breaking");

//Update database
export const updateDB = (allquals,uid,myquals) => {
  return db.doc("Calificaciones").set({ calificaciones: [...allquals] }) && db.doc(uid).set({ calificacion: myquals})
};

export const updateFavsDB = (uid,favorites) => {
  return db.doc(uid).set({ favorites: favorites})
};

//Get allQual Database
export const getAllQuals = async () => {
  return await db
    .doc("Calificaciones")
    .get()
    .then((snap) => {
      return snap.data().calificaciones;
    });
};

export const getAllFavs = async (uid) => {
  return await db
    .doc(uid)
    .get()
    .then((snap) => {
      return snap.data().favorites;
    });
};

/**
 * Login and singOut
 */
export const loginWithGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap) => snap.user);
};

export const signOutGoogle = () => {
  firebase.auth().signOut();
};
