const contents = document.querySelector(".contents"); 

const THEME_SIZE = 4;
const themeNames = ["바다", "산", "도시", "마을"];
const folderNames = ["beach", "mountain", "city", "village"];
const themeItemNumbers = [5, 4, 5, 6];

const beachList = [
    {
        region: "Motu Tane Island",
        country: "Bora Bora, French Polynesia",
    },
    {
        region: "Oahu",
        country: "Hawaii"
    },
    {
        region: "Kuramathi",
        country: "Maldives"
    },
    {
        region: "Onok",
        country: "Palawan, Philipines"
    },
    {
        region: "월정리 해변",
        country: "대한민국, 제주도 구좌읍"
    },
];

const mountainList = [
    {
        region: "Snoqualmie Region",
        country: "Washington State, USA"
    },
    {
        region: "Issaquah Squak Mountain",
        country: "Washington State, USA"
    },
    {
        region: "British Columbia Forest",
        country: "Canada"
    },
    {
        region: "Belgrad Forest",
        country: "Istanbul, Turkey"
    }
];

const cityList = [
    {
        region: "Rome",
        country: "Italy"
    },
    {
        region: "Tuscany",
        country: "Italy"
    },
    {
        region: "Amsterdam",
        country: "Netherlands"
    },
    {
        region: "Vienna",
        country: "Austria"
    },
    {
        region: "Budapest",
        country: "Hungary"
    }
];

const villageList = [
    {
        region: "한옥 마을",
        country: "대한민국, 전주"
    },
    {
        region: "Mourèze",
        country: "France"
    },
    {
        region: "Kyoto",
        country: "Japan"
    },
    {
        region: "Gimmelwald",
        country: "Switzerland"
    },
    {
        region: "Lauterbrunnen",
        country: "Switzerland"
    },
    {
        region: "Positano",
        country: "Italy"
    }
];

const placeList = [beachList, mountainList, cityList, villageList];

for(var i = 0; i < THEME_SIZE; i++){
    const themeList = document.createElement("div");
    themeList.setAttribute("class", "theme-list");

    // 각 테마의 이름 
    const themeName = document.createElement("h3");
    themeName.setAttribute("class", "theme-name");
    themeName.innerText = themeNames[i];
    themeList.appendChild(themeName);

    const scrollMenu = document.createElement("div");
    scrollMenu.setAttribute("class", "scroll-menu");

    for(var j = 0; j < themeItemNumbers[i]; j++) {
        // 테마별 장소의 이미지 
        const link = document.createElement("a");
        link.href = "../html/main.html" // TODO: 디비에서 가져온 영상 링크로 대체하기 

        const img = document.createElement("img");
        img.src = `../img/theme/${folderNames[i]}/${j+1}.jpg`;
        img.setAttribute("class", "place-img");

        link.appendChild(img);
        scrollMenu.appendChild(link);
    }

    // 각 테마에 스크롤 메뉴 추가 
    themeList.appendChild(scrollMenu);

    // 테마 리스트를 컨텐츠 영역에 추가 
    contents.appendChild(themeList);
}