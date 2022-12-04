const iframe = document.querySelector("iframe");
const url = document.getElementById("url");
const videoControl = "autoplay=1&mute=1&loop=1&controls=0&disablekb=1&start=25"

// TODO: const videoUrl = "<%= data.url %>"

const videoUrl = url.value;

iframe.src = videoUrl + "?" + videoControl
console.log(iframe.src)

