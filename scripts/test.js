var requiredObject;
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

function myFunction() {
  modal.style.display = "block";

  modalImg.src = event.target.src;
  captionText.innerHTML = "click  X to close";

  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    //document.getElementById("demo").innerHTML = xhttp.responseText;
    // console.dir(xhttp.responseText)
    requiredObject = JSON.parse(xhttp.responseText);
    for (let i = 0; i < requiredObject.length; i++) {
      requiredObject[i][
        "imageLink"
      ] = `./images/${requiredObject[i].partNumber}.jpg`;
    }
    /// Since we already have it in array format  getData(requiredObject)
    $(document).ready(function () {
      $("#example").DataTable({
        scrollX: true,
        fixedHeader: true,
        data: requiredObject,
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
  }
};
xhttp.open("GET", "testdata.json", true);
xhttp.send();
