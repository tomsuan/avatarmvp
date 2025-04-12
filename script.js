window.WebChat.default({
    socketUrl: 'http://localhost:5005',
    socketPath: '/socket.io/',
    title: 'AI Avatar',
    subtitle: 'Your friendly chatbot',
    selector: '#webchat'
});

document.getElementById('tone').addEventListener('change', function() {
    let tone = this.value;
    window.WebChat.send({ type: 'tone', value: tone });
});
