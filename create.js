import { clearInputs, } from "./dom_util.js";

const submitButton = document.getElementById("submit_button");
const nameInput = document.getElementById("name_input");
const memoryInput = document.getElementById("memory_input");
const zoomInput = document.getElementById("zoom_input");

submitButton.addEventListener("click", (event) => {
   event.preventDefault();
   createCamera();
})

async function createCamera() {
   if (nameInput.value && memoryInput.value && zoomInput.value >= 1) {
      await fetch("http://localhost:8090/cameras/add", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            'nameOfManufacturer': nameInput.value,
            'memoryCapacity': memoryInput.value,
            'zoomFactor': zoomInput.value,
         })
      })
         .then(response => {
            if (response.status === 200) {
               clearInputs();
               setTimeout(() => { window.location.href = "./index.html" }, 500)
            }
         })
         .catch((error) => console.log(error));
   } else {
      alert("Try again later!")
   }
}