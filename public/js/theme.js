const themeName = document.querySelector(".theme-name");
const scrollMenu = document.querySelector(".scroll-menu");

const themeNames = ["바다", "산", "마을", "도시"];

const fileName = "1.jpg"
const filePath = `../img/theme/${fileName}`;

for(var i = 0; i < 4; i++) {
    themeName.innerText = themeNames[i];
}

const themeImg = document.createElement("img");
themeImg.src = filePath
scrollMenu.appendChild(themeImg);

