const videoSoundButton = document.querySelector("#video-sound-btn");

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//const url = document.getElementById("url");
//const videoUrl = url.value;
const _videoId = "lOGE7nNkL0Y";
//const videoControl = "?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&start=25";

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-player', {
        videoId: _videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            'autoplay': 1, 
            'mute': 1,
            'loop': 1, 
            'controls': 0,
            'disablekb': 1,
            'start': 25
        },
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();

}

// 5. The API calls this function when the player's state changes.
function onPlayerStateChange(event) {

}

videoSoundButton.addEventListener("click", () => {
    if(videoSoundButton.innerText == 'ON') {
        console.log(videoSoundButton.innerText);
        videoSoundButton.innerText = 'OFF';
        player.unMute();
    }else {
        console.log(videoSoundButton.innerText);
        videoSoundButton.innerText = 'ON';
        player.mute();
    }
})