const THEME_SIZE = 4;
const themeNames = ["바다", "산", "도시", "마을"];
const folderNames = ["beach", "mountain", "city", "village"];
const themeItemNumbers = [5, 4, 5, 6];

for(var i = 0; i < THEME_SIZE; i++){
    const theme = document.createElement("div");

    // 테마 이름 출력 
    const themeName = document.createElement("h2");
    themeName.innerText = themeNames[i];
    theme.appendChild(themeName);

    // 각 테마별 이미지 개수에 맞게 출력 
    const scrollMenu = document.createElement("div");
    scrollMenu.setAttribute("class", "scroll-menu");

    for(var j = 0; j < themeItemNumbers[i]; j++) {
        const link = document.createElement("a");
        link.href = "../html/main.html" // TODO: 디비에서 가져온 영상 링크로 대체하기 
        
        const img = document.createElement("img");
        img.src = `../img/theme/${folderNames[i]}/${j+1}.jpg`;
        link.appendChild(img);
        scrollMenu.appendChild(link);
    }
    theme.appendChild(scrollMenu);

    document.body.appendChild(theme);
}