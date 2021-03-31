// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js");
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
const messaging = firebase.messaging();
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
// messaging.onMessage((payload) => {
//   console.log("Message received. ", payload);
//   // ...
// });

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging
  .getToken({
    vapidKey:
      "BI5BrBT09c3x5N67lDyRt0me9xCqJaHPqZEj22y8gdOu93PPvKGxgpT4UuvqqDpO-jMGBRaWD-cT_UKmgKcC1SE",
  })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });
