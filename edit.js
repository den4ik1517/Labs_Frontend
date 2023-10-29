import {
   clearInputs,
} from "./dom_util.js";

const nameInput = document.getElementById("name_input");
const memoryInput = document.getElementById("memory_input");
const zoomInput = document.getElementById("zoom_input");
const editButton = document.getElementById("edit_button");

editButton.addEventListener("click", () => {
   const id = parseInt(window.sessionStorage.getItem("id"));
   updateCamera(id);
   setTimeout(() => window.location.href = "./index.html", 500);
})

async function updateCamera(id) {
   if (nameInput.value && memoryInput.value && zoomInput.value >= 1) {
      fetch(`http://localhost:8090/cameras/update/${id}`, {
         method: 'PUT',
         headers: {
            'Content-type': 'application/json',
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
            }
         })
         .catch(() => { alern(`${response.status}`) });
   }
}