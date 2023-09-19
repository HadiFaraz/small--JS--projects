const toggleBtn = document.querySelector(".toggle--btn")
const closeBtn = document.querySelector(".close--btn")
const sideBar = document.querySelector(".sidebar")

toggleBtn.addEventListener('click', function() {
    sideBar.classList.toggle("show--sidebar")
});

closeBtn.addEventListener('click', function() {
    sideBar.classList.remove("show--sidebar")
});