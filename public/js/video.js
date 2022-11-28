const iframe = document.querySelector("iframe");
const videoControl = "autoplay=1&mute=1&loop=1&controls=0&disablekb=1"
//const videoUrl = "<%= data.url %>"
const videoUrl = "https://www.youtube.com/embed/lOGE7nNkL0Y?"

iframe.src = videoUrl + videoControl
console.log(iframe.src)

