const boardOfItem = document.getElementById("items_container");

const nameInput = document.getElementById("name_input");
const memoryInput = document.getElementById("memory_input");
const zoomInput = document.getElementById("zoom_input");

export const EDIT_BUTTON_PREFIX = 'edit-button-'
export const REMOVE_BUTTON_PREFIX = 'remove-button-'

export const clearInputs = () => {
   nameInput.value = "";
   memoryInput.value = "";
   zoomInput.value = "";
}

const itemTemplate = ({ id, nameOfManufacturer, memoryCapacity, zoomFactor }) => `
<li id="${id}"class="item_card">
   <img src="./foto.jpeg" alt="card">
   <div>
   <h5>${nameOfManufacturer}</h5>
   <p>Memory: ${memoryCapacity}</p>
   <p>Zoom: ${zoomFactor} <p>
   <div class="div__btn">
      <button id="${EDIT_BUTTON_PREFIX}${id}" class="btrn btrn__edit__btn"> Edit </button>
      <button id="${REMOVE_BUTTON_PREFIX}${id}" class="btrn btrn__remove__btn"> Remove </button>
   </div>
   </div>
</li>`;


export const addItemToPage = ({ id, nameOfManufacturer, memoryCapacity, zoomFactor }) => {
   boardOfItem.insertAdjacentHTML(
      "afterbegin",
      itemTemplate({ id, nameOfManufacturer, memoryCapacity, zoomFactor })
   );

   const removeButton = document.querySelector(`#${REMOVE_BUTTON_PREFIX}${id}`);
   const editButton = document.querySelector(`#${EDIT_BUTTON_PREFIX}${id}`);

   removeButton.addEventListener("click", () => deleteCamera(id));
   editButton.addEventListener("click", () => {
      window.sessionStorage.setItem("id", id)
      window.location.href = `./edit.html`
   })
};

export const clearPage = () => {
   while (boardOfItem.firstChild) {
      boardOfItem.removeChild(boardOfItem.firstChild);
   }
}

async function deleteCamera(id) {
   await fetch(`http://localhost:8090/cameras/delete/${id}`, {
      method: "DELETE"
   })
      .then(() => {
         clearPage();
         getListOfCamera();
      })
      .catch((error) => console.log(error))
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
         let arrayOfCamera = data;
         arrayOfCamera.forEach(addItemToPage)
      })
      .catch((error) => console.log(error));
}