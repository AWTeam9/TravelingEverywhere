const toggleButton = document.querySelector(".side-panel-toggle")

toggleButton.addEventListener("click", () => {
    document.querySelector(".wrapper").classList.toggle("side-panel-open");
})