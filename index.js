import {
   addItemToPage,
   clearPage,
} from "./dom_util.js";

const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const sortButton = document.getElementById("sort_button");


getListOfCamera();
let arrayOfCamera;

findButton.addEventListener("click", () => {
   const foundCamera = arrayOfCamera.filter(
      (camera) => camera.nameOfManufacturer.search(findInput.value) !== -1
   );
   clearPage();
   foundCamera.forEach(addItemToPage);
});

cancelFindButton.addEventListener("click", () => {
   findInput.value = " ";
   clearPage();
   arrayOfCamera.forEach(addItemToPage)
});

sortButton.addEventListener("click", () => {
   clearPage();
   let properties = document.getElementsByName("property");
   for (const property of properties) {       
      if (property.checked === true) {
         const sortCamera = arrayOfCamera.sort((a, b) => (+a[property.value] > +b[property.value]) ? 1 : ((+b[property.value] > +a[property.value]) ? -1 : 0));
         sortCamera.forEach(addItemToPage)
      }
   }
});

document.getElementById("press").addEventListener("click", () => {
   let total = 0;
   arrayOfCamera.forEach((a) => total += parseInt(a["memoryCapacity"]))
   document.getElementById("count").innerHTML = total;
});

const recordDataToArray = (array) => {
   arrayOfCamera = array;
}

async function getListOfCamera() {
   await fetch("http://localhost:8090/cameras", {
      method: "GET",
      headers: {
         'Content-Type': 'application/json'
      }
   })
      .then((response) => response.json())
      .then((data) => {
         data.forEach(addItemToPage)
         recordDataToArray(data);
      })
      .catch((error) => console.log(error));
}
