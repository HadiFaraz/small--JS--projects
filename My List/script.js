//select items

const container = document.querySelector(".controls-container");
const alert = document.querySelector(".alert");
const input = document.getElementById("input");
const submitBtn = document.querySelector(".submit-btn");
const groceryContainer = document.querySelector(".grocery-container");
const list = document.querySelector(".list");
const clearBtn = document.querySelector(".clear-btn");

//edit option
let editElement;
let editFlag = false;
let editId = "";

container.addEventListener("submit", addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);

//add Item

function addItem(e) {
    e.preventDefault();
    const value = input.value;
    const id = new Date().getTime().toString();

    if (value!== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
                <div class="btn-container">
                    <button type="button" class="edit-btn">
                        <i class = "fas fa-edit"></i>
                    </button>
                    <button type="button" class="delete-btn">
                        <i class = "fas fa-trash"></i>
                    </button>
                </div>`;
        
        // add event listner to both buttons
        const editBtn = element.querySelector(".delete-btn");
        editBtn.addEventListener("click", editItem);
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);

        //append child
        list.appendChild(element);
        
        //display alert
        displayAlert("item added to the list", "success");

        //show container
        groceryContainer.classList.add("show-container");
        //set local storage
        addToLocalStorage(id, value);
        //set back to default
        setBackToDefault();
    }   else {
        displayAlert("please enter value", "alert");
    };
}

//display alert 
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

//clear items
function clearItems() {
    const items = document.querySelectorAll(".grocery-item")
    if (items.length > 0) {
        items.forEach((item) => {
            list.removeChild(item);
        });
    }
    groceryContainer.classList.remove("show-container")
    displayAlert("empty list", "alert")
    setBackToDefault();
    localStorage.removeItem("list");
}

//delete item
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);

    if (list.children.length === 0) {
        groceryContainer.classList.remove("show-container");
    }
    displayAlert("item removed", "alert")

    setBackToDefault();
    removeFromLocalStorage(id);
}

//edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    input.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "edit";
    console.log(editFlag)
}

// set backt to defaults
function setBackToDefault() {
    input.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "submit";
}
  
// ****** local storage **********
  
// add to local storage
function addToLocalStorage(id, value) {
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
  
function getLocalStorage() {
    return localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [];
}
  
function removeFromLocalStorage(id) {
    let items = getLocalStorage();
  
    items = items.filter(function (item) {
      if (item.id !== id) {
        return item;
      }
    });
  
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
  
    items = items.map(function (item) {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}
  
// SETUP LOCALSTORAGE.REMOVEITEM('LIST');
  
// ****** setup items **********
  
function setupItems() {
    let items = getLocalStorage();
  
    if (items.length > 0) {
      items.forEach(function (item) {
        createListItem(item.id, item.value);
      });
      container.classList.add("show-container");
    }
}
  
function createListItem(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
              <div class="btn-container">
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                  <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
  
    // append child
    list.appendChild(element);
}



