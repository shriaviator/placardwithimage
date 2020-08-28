
var requiredObject ;
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");


var classNameFunction = function(){
  var classNameLive = document.getElementsByClassName("modal-class");
  var classNameArray=[...classNameLive];
  
  var arrayFinal = classNameArray.map(function(x){x.addEventListener("click",function(){
    modal.style.display = "block";
    modalImg.src = this.attributes['data-src'].value;
    captionText.innerHTML = "Click X cross to exit";
  })})
  }

  var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.addEventListener("click",function() {
  modal.style.display = "none";
})


function buildTable(data) {
  let table = document.getElementById("myTable")
  table.innerHTML = ""

  for (let i = 0; i < data.length; i++) {

    var row = `<tr>
            <td>${data[i].location}</td>
            <td>${data[i].partNumber}</td>
            <td>${data[i].alternatePartNo}</td>
            
            <td>${data[i].textinPlacard}</td>
            <td><button class="modal-class btn btn-primary" data-src="${data[i].imageLink}">Click for Image</button></td>
            </tr>`

    table.innerHTML += row;
  }
 
 classNameFunction()
}
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    //document.getElementById("demo").innerHTML = xhttp.responseText;
    // console.dir(xhttp.responseText)
     requiredObject = JSON.parse(xhttp.responseText);

 

 /// Since we already have it in array format  getData(requiredObject)
    buildTable(requiredObject);
    
  }
   
}
xhttp.open("GET", "placardjsonwithimage.json", true);
xhttp.send();


//===============================

//Making the modal work 
/*

// the searching part when input is recieved from user 

// the searching part when input is recieved from user 

// Event listener add ing the search function :



*/
function searchTable(xray, data) {
  var filteredData = []
  for (let i = 0; i < data.length; i++) {
    let name = data[i].textinPlacard.toString().toLowerCase()
console.log(name)
    if (name.includes(xray)) {
      filteredData.push(data[i])
    }
  }
  console.log(filteredData)
  return filteredData;
}
let myfunction = function () {
  let xray = document.getElementById("search-input")
  xray = xray.value.toLowerCase();

  console.log(xray)
  var data = searchTable(xray,requiredObject)
  buildTable(data)
  console.dir(getClassName())
}

document.getElementById("search-input").addEventListener("keyup",myfunction)
