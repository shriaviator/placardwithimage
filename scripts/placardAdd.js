/*To-Do-Js : When image is seleceteed placard text should be set to image only */
/*To-Do-Js :File size on input file types and file size tio be restricted */
/*To-Do-Js : todo make image filename = partnumber of placard name
 todo images are not going into a folder
iamge ipload input value should change on file upload
 clear the form rather than reset it https://www.javascript-coder.com/javascript-form/javascript-reset-form/*/

// $ ready jquery alternative

function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

const placardListForm = document.querySelector("#placardListForm");

docReady(() => {
  document
    .querySelector("#placardListForm")
    .addEventListener("submit", (xray) => {
      console.log("submit clicked");
      xray.preventDefault();
      const file = document.querySelector("#customFile").files[0];
      const name = +new Date() + "-" + file.name;
      const metadata = { contentType: file.type };
      const task = firestorageRef.child(`images/${name}`).put(file, metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          let imageLink = url;
          console.log(url);
          // document.querySelector("#someImageTagID").src = url;
          return db.collection("placard").add({
            //add creates a unique id for you
            location: placardListForm.placardLocation.value,
            partNumber: placardListForm.partNumber.value,
            alternatePartNo: "",
            ipcRef: "",
            textinPlacard: placardListForm.placardText.value,
            imageLink: imageLink,
          });
        })
        .then(function (docRef) {
          /* log data */
          placardListForm.reset();
          alert("Data submitted ");
        })
        .catch(function (error) {
          /* error */
          placardListForm.reset();
          alert("Try again : Submission Error");
        });

      // saving data to firestore
    });
});

document.getElementById("gridRadios1").addEventListener("change", () => {
  document.body.addEventListener("change", (event) => {
    switch (event.target.id) {
      case "gridRadios1":
        document.getElementById("placardText").disabled = true;
        break;
      case "gridRadios2":
        document.getElementById("placardText").disabled = false;
        break;
    }
  });
});

// form validation from bootatrap
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();
