// firestorekey
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAeB9wOjuStJMcIFUTtOWGBfAE5sA-iIH0",
  authDomain: "placardwithimage.firebaseapp.com",
  projectId: "placardwithimage",
  storageBucket: "placardwithimage.appspot.com",
  messagingSenderId: "948987512120",
  appId: "1:948987512120:web:75beac96b085c317a22dcd",
  measurementId: "G-CJ3PN4YYH3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// refernces to firebase for local Use
const db = firebase.firestore();
const fauth = firebase.auth();
const firestorage = firebase.storage();
const firestorageRef = firestorage.ref();
// const placardImagesRef = firestorageRef.child("placardImages/");
