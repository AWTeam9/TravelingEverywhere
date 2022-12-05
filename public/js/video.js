const iframe = document.querySelector("iframe");
const url = document.getElementById("url");
const videoControl = "?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&start=25"

const videoUrl = url.value;
//const videoUrl = "https://www.youtube.com/embed/lOGE7nNkL0Y"
iframe.src = videoUrl + videoControl;

// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";

// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         //videoId: 'LdIjNVHCVsc',
//         playerVars: {
//             autoplay: 1,
//             mute: 1,
//             loop: 1,
//             controls: 0,
//             disablekb: 1,
//             start:25,
//             //playlist: 'LdIjNVHCVsc'
//         },
//         events: {
//             onReady: function (e) {
//                 // e.target.mute();
//                 e.target.setPlaybackRate(0.5); // set to half speed
//             }
//         }
//     });
// }