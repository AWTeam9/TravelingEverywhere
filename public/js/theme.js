const contents = document.querySelector(".contents"); 

const THEME_SIZE = 4;
const themeNames = ["바다", "산", "도시", "마을"];
const folderNames = ["beach", "mountain", "city", "village"];
const themeItemNumbers = [5, 4, 5, 6];

for (var i = 0; i < THEME_SIZE; i++) {
    const theme = document.createElement("div");

    // 각 테마의 이름 
    const themeName = document.createElement("h3");
    themeName.setAttribute("class", "theme-name");
    themeName.innerText = themeNames[i];
    themeList.appendChild(themeName);

    const scrollMenu = document.createElement("div");
    scrollMenu.setAttribute("class", "scroll-menu");

    for (var j = 0; j < themeItemNumbers[i]; j++) {
        // 테마별 장소의 이미지
        const link = document.createElement("a");
        link.href = "../html/main.html" // TODO: 디비에서 가져온 영상 링크로 대체하기 
        
        // href에 /main?location= 뒤에 지역이름 (노션 'db 구축'에 저장된 이름 있음.) 붙여주면 된다~
        // <a href="/main?location=Oahu">Oahu</a> <- 이런 느낌

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