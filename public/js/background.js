const BACKGROUND_IMAGE_SIZE = 8;
const images = [];
for(var i = 0; i < BACKGROUND_IMAGE_SIZE; i++){
    images[i] = `${i + 1}.jpg`;
}

const chosenImage = images[Math.floor(Math.random() * images.length)];
const filePath = `../img/background/${chosenImage}`;

document.body.style.backgroundImage =  `url(${filePath})`

