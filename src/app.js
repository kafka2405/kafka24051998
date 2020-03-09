import Peer from 'peerjs';
import $ from "jquery";
import uid from 'uid';

const openStream = require('./getStream');
const playVideo = require('./playVideo');

const CONFIG = { host: 'webrtcandpeerjs.herokuapp.com', port: 443, secure: true, key: 'peerjs' }

function getPeer() {
    const id = uid(10);
    $('#peer-id').append(id);
    return id;
}

const peer = new Peer(getPeer(), CONFIG);

$('#btnCall').click(() => {
    const friendId = $('#txtFriendId').val();
    openStream(stream => {
        playVideo(stream, 'localStream');
        const call = peer.call(friendId, stream);
        call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
    });
});

peer.on('call', (call) => {
    openStream(stream => {
        playVideo(stream, 'localStream');
        call.answer(stream);
        call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
    });
});