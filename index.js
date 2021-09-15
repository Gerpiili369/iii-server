const
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    { Server } = require("socket.io"),
    io = new Server(server),
    displays = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:display', (req, res) => {
    res.sendFile(__dirname + '/display.html');
});

io.on('connection', socket => {
    socket.on('display', displayData => {
        displays[displayData.index] = displayData.url;
        io.emit('display', displayData);
    });
    socket.on('requestDisplay', index => socket.emit('display', { index, url: displays[index]}));
    socket.on('requestDisplayList', () => socket.emit('displayList', displays));
});

server.listen(3000, () => { 
    console.log('listening on *:3000');
});