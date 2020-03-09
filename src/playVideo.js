function playVideo(stream, idVideo) {
    var video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.onloadedmetadata = () => video.play();
}

module.exports = playVideo; 