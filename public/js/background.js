const images = ["beach.jpg", "beach2.jpg", "city.jpg", "city2.jpg", 
                "mountain.jpg", "village.jpg", "village2.jpg", 
                "village3.jpg", "village4.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];
const imgUrl = `../img/${chosenImage}`;
document.body.style.backgroundImage =  `url(${imgUrl})`
