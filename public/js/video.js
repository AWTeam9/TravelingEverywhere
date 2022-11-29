const iframe = document.querySelector("iframe");
const videoControl = "autoplay=1&mute=1&loop=1&controls=0&disablekb=1&start=25"

// TODO: const videoUrl = "<%= data.url %>"
const videoUrl = "https://www.youtube.com/embed/9fo-P0N1Wko?"

iframe.src = videoUrl + videoControl
console.log(iframe.src)

