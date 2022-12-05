var start;
window.onload = function () {
    start = new Date();
    console.log("onload!");
    var data = document.getElementById("data");

}

window.addEventListener("beforeunload", sendPost);

function sendPost() {
    end = new Date();
    time = end.getTime() - start.getTime();
    $.ajax({
        type: "POST",
        url: "/sendTime",
        data: { time: time, location: data.value }
    });

    return;
}