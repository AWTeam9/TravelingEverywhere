let num = 0;

let src = '';

let bgm_size = 0;

window.onload = function () {
    let audio = document.getElementById("bgm");
    let text = document.getElementById("test");

    audio.addEventListener('ended', () => {
        num += 1;
        nextPlay(audio);
    });  //곡이 끝날때 실행
}

const nextPlay = async (audio) => {
    const res = await fetch('http://localhost:52273/music?num=' + num);
    const result = await res.json()

    console.log(result.src);
    audio.src = result.src;
}