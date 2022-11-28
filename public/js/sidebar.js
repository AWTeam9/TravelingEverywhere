const sideBar = document.querySelector(".side-bar");
const visibilityButton = document.querySelector(".material-icons")

function handleVisibilityButtonClick() {
    if (sideBar.style.display === "none") {
        sideBar.style.display = "block";
    } else {
        sideBar.style.display = "none";
    }
}

visibilityButton.addEventListener("click", handleVisibilityButtonClick);
