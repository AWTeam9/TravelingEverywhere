const placeList = document.querySelector(".place-list");

const beachList = [
    "Motu Tane - French Polynesia",
    "Oahu - USA Hawaii",
    "Kuramathi - Maldives",
    "Onok - Philipines Palawan",
    "Woljeongri - Korea Jeju"
];
const mountainList = [
    "Snoqualmie Region - USA Washington State",
    "Issaquah - USA Washington State",
    "British Columbia - Canada",
    "Belgrad Forest - Turkey Istanbul"
];
const cityList = [
    "Rome - Italy",
    "Amsterdam - Netherlands",
    "Vienna - Austria",
    "Budapest - Hungary",
    "Tuscany - Italy",
];
const villageList = [
    "Jeonju Hanok - Korea",
    "Moureze - France",
    "Kyoto - Japan",
    "Gimmelwald - Switzerland",
    "Lauterbrunnen - Switzerland",
    "Positano - Italy"
];

const dataset = [beachList, mountainList, cityList, villageList];
const THEME_SIZE = 4;
const themeNames = ["바다", "산", "도시", "마을"];

for (var i = 0; i < THEME_SIZE; i++) {
    const themeName = document.createElement("h4");
    themeName.setAttribute("class", "theme-name");
    themeName.innerText = themeNames[i];
    placeList.appendChild(themeName);

    const themeItems = document.createElement("div");
    themeItems.setAttribute("class", "theme-items");

    const arr = dataset[i];
    for (var j = 0; j < arr.length; j++) {
        const item = document.createElement("p");
        item.setAttribute("class", "theme-item");
        item.innerText = arr[j];

        item.addEventListener("click", () => {
            const seperatedStr = item.innerText.split('-');
            const locationName = seperatedStr[0].trim();
            document.location.href = `/main?location=${locationName}`;
        });

        themeItems.appendChild(item);
    }

    placeList.appendChild(themeItems);
}