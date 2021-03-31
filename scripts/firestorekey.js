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
const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(() => {
    console.log("have permission");
    return messaging.getToken({
      vapidKey:
        "BI5BrBT09c3x5N67lDyRt0me9xCqJaHPqZEj22y8gdOu93PPvKGxgpT4UuvqqDpO-jMGBRaWD-cT_UKmgKcC1SE",
    });
  })
  .then((token) => {
    console.log(token);
    return "hello";
  })
  .catch((err) => {
    console.log("permission denied");
  });

messaging.onMessage((payload) => {
  console.log("onscreenpushmessage", payload);
});

/*To-Do-Js :Public key
BI5BrBT09c3x5N67lDyRt0me9xCqJaHPqZEj22y8gdOu93PPvKGxgpT4UuvqqDpO-jMGBRaWD-cT_UKmgKcC1SE
Private key
g0JneyGb2IqIOy4gXO_bKZWadJ8ISiwiNuL5NbIYqLA*/
