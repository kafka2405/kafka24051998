function openStream(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 1280, height: 720 } })
        .then(stream => {
            callback(stream);
        }).catch(err => console.log(err));
}

module.exports = openStream;