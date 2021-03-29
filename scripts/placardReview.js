const placardList = document.querySelector("#placardContainer");

function renderPlacardList(doc) {
  let test_html = /*html*/ `
 
  <button class="accordion">Part Number : ${
    doc.data().partNumber
  }  <ul class="list-group">
  <li class="list-group-item">
  <span style="font-size: 1em; color: Tomato;">
  <i class="fa fa-chevron-up" aria-hidden="true"></i>
  </span>
  
  <span class="label label-primary" style="font-size: 1.3em">18</span>
  <span style="font-size: 1em; color:  Dodgerblue;">
  <i class="fa fa-chevron-down" aria-hidden="true"></i>
  </span>
  </li>

  </ul> </button>
    <div class="panel">
   
    <ul data-id = ${doc.id}>
    
		
	</li>
    <li><span>Placard Text : ${doc.data().textinPlacard}</span></li>
    <li><span>Placard Location: ${doc.data().location}</span></li>
    <li><span>Placard Image :<img src="${doc.data().imageLink}" > </span></li>
    </ul>
    </div>
  
  
  `;

  placardList.innerHTML += test_html;
}

db.collection("placard")
  .get()
  .then((querySnapshot) => {
    placardList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      renderPlacardList(doc);
    });
  })
  .then(() => {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  });
