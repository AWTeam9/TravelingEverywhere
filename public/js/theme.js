const contents = document.querySelector(".contents"); 

const THEME_SIZE = 4;
const themeNames = ["바다", "산", "도시", "마을"];
const folderNames = ["beach", "mountain", "city", "village"];
const themeItemNumbers = [5, 4, 5, 6];

const beachNames = ["Motu Tane", "Oahu", "Kuramathi", "Onok", "Woljeongri"];
const mountainNames = ["Snoqualmie Region", "British Columbia", "Issaquah", "Belgrad Forest"];
const cityNames = ["Rome", "Amsterdam", "Vienna", "Budapest", "Tuscany"];
const villageNames = ["Jeonju Hanok", "Moureze", "Kyoto", "Gimmelwald", "Lauterbrunnen", "Positano"];

const locationNames = [beachNames, mountainNames, cityNames, villageNames]; 

for (var i = 0; i < THEME_SIZE; i++) {
    const themeList = document.createElement("div");
    themeList.setAttribute("class", "theme-list");

    // 각 테마의 이름 
    const themeName = document.createElement("h3");
    themeName.setAttribute("class", "theme-name");
    themeName.innerText = themeNames[i];
    themeList.appendChild(themeName);

    const scrollMenu = document.createElement("div");
    scrollMenu.setAttribute("class", "scroll-menu");

    // 테마별 이미지 추가 
    for (var j = 0; j < themeItemNumbers[i]; j++) {
        const link = document.createElement("a");
        const locationName = locationNames[i][j];
        link.href = `/main?location=${locationName}`;
        //link.href = "../html/main.html"

        const img = document.createElement("img");
        img.src = `../img/theme/${folderNames[i]}/${j + 1}.jpg`;
        img.setAttribute("class", "place-img");
        
        link.appendChild(img);
        scrollMenu.appendChild(link);
    }

    // 각 테마에 스크롤 메뉴 추가 
    themeList.appendChild(scrollMenu);

    // 테마 리스트를 컨텐츠 영역에 추가 
    contents.appendChild(themeList);
}