const radioPlayButton = document.getElementById("radio-play-btn");
const radioPauseButton = document.getElementById("radio-pause-btn");
const radioPrevButton = document.getElementById("radio-prev-btn");
const radioNextButton = document.getElementById("radio-next-btn");
const musicTitle = document.getElementById("music-title");

const filePath = "../bgm/";
const musicTitles = [
    "pureness",
    "natural light",
    "long a wait",
    "lost voice",
    "If I could tell you"
];

let currentMusicIndex = 0; 
const musicPlayer = new Audio();
musicPlayer.src = filePath + musicTitles[currentMusicIndex] + ".mp3";
musicTitle.innerText = musicTitles[currentMusicIndex];

radioPlayButton.onclick = function() {
    musicPlayer.play(); 
    radioPlayButton.style.display = 'none';
    radioPauseButton.style.display = 'block';
}

radioPauseButton.onclick = function() {
    musicPlayer.pause(); 
    radioPauseButton.style.display = 'none';
    radioPlayButton.style.display = 'block';
}

radioPrevButton.onclick = function() {
    currentMusicIndex--;
    console.log(currentMusicIndex);

    if(currentMusicIndex < 0) currentMusicIndex = musicTitles.length - 1; 

    musicPlayer.src = filePath + musicTitles[currentMusicIndex] + ".mp3";
    musicTitle.innerText = musicTitles[currentMusicIndex];

    if(radioPauseButton.style.display == 'block'){
        musicPlayer.play(); 
    }
}

radioNextButton.onclick = function() {
    currentMusicIndex++;
    console.log(currentMusicIndex);

    if(currentMusicIndex > musicTitles.length - 1) currentMusicIndex = 0; 

    musicPlayer.src = filePath + musicTitles[currentMusicIndex] + ".mp3";
    musicTitle.innerText = musicTitles[currentMusicIndex];

    if(radioPauseButton.style.display == 'block'){ 
        musicPlayer.play(); 
    }
}