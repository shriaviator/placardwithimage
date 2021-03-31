/*To-Do-Js :close modal on signup/Login*/
/*To-Do-Js :gi*/
var requiredObject;
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
// var captionText = document.getElementById("caption");

function myFunction() {
  modal.style.display = "block";

  modalImg.src = event.target.src;
  // captionText.innerHTML = "click  X to close";

  var span = document.getElementsByClassName("selfModalClose")[0];

  // When the user clicks on <span> (x), close the modal
  span.addEventListener("click", function () {
    modal.style.display = "none";
  });
}
/*To-Do-Js :*/
async function fetchPlacardData() {
  const response = await fetch("./testdata.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const tableData = await response.json();
  return tableData;
}

fetchPlacardData()
  .then((tableData) => {
    for (let i = 0; i < tableData.length; i++) {
      tableData[i]["imageLink"] = `./images/${tableData[i].partNumber}.jpg`;
    }
    requiredObject = tableData;
    $(document).ready(function () {
      $("#example").wrap('<div id="placardTableHide" style="display:none"/>');
      $("#example").DataTable({
        language: {
          searchPanes: {
            collapse: { 0: "Select Location", _: "Select Location (%d)" },
          },
        },
        buttons: [
          {
            extend: "searchPanes",
            config: {
              cascadePanes: true,
            },
          },
        ],
        columnDefs: [
          {
            searchPanes: {
              show: true,
            },
            targets: [0],
          },
        ],
        dom: "Bfrtip",
        scrollX: true,
        fixedHeader: true,
        data: tableData,
        columns: [
          { data: "Location" },
          { data: "partNumber" },
          { data: "textinPlacard" },
          {
            data: "imageLink",
            render: function (data, type, row) {
              return (
                '<img src="' +
                data +
                '" class = "modal-class" style="height:50px;width:100px;" onclick="myFunction()"/>'
              );
            },
          },
        ],
      });
    });
    // console.log(tableData);
  })
  .catch((err) => {
    console.log(err.message);
  });

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     // Typical action to be performed when the document is ready:
//     requiredObject = JSON.parse(xhttp.responseText);

//     /// Since we already have it in array format  getData(requiredObject)

//   }
// };
// xhttp.open("GET", "testdata.json", true);
// xhttp.send();

// google sign up
document.getElementById("googleSignUp").addEventListener("click", (xray) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      console.log(token);
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      $("#bsmodal-signup").modal("hide");
    });
  /*To-Do-Js :Promise error not being caught */
  // alert("hello");
});

// logout action

document
  .getElementById("bs-placard-logout")
  .addEventListener("click", (xray) => {
    alert("hello");
    fauth
      .signOut()
      .then((xray) => {
        console.log("user signed out");
      })
      .catch((err) => {
        console.log(err);
      });
  });

// login action
document
  .getElementById("bs-placard-login")
  .addEventListener("click", (xray) => {
    // alert("helloi");
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(token, user);
        // console.log("hello");
        // ...
        $("#bsmodal-login").modal("hide");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  });
fauth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log("user logged in ");
    console.log(user.email);
    document.getElementById("loggedinUserEmail").innerText = user.email;
    document.getElementById("placardTableHide").style.display = "block";
    $("#example").DataTable().columns.adjust().draw();
    [...document.getElementsByClassName("logged-in")].forEach((item) => {
      item.style.display = "block";
    });
    [...document.getElementsByClassName("logged-out")].forEach((item) => {
      item.style.display = "none";
    });
  } else {
    // User is signed out.
    document.getElementById("loggedinUserEmail").innerText = "";
    document.getElementById("placardTableHide").style.display = "none";
    [...document.getElementsByClassName("logged-in")].forEach((item) => {
      item.style.display = "none";
    });
    [...document.getElementsByClassName("logged-out")].forEach((item) => {
      item.style.display = "block";
    });
  }
});
