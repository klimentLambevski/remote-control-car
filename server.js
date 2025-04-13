// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Use the public folder for static files (HTML, CSS, client-side JS)
app.use(express.static(__dirname + '/public'));

// Define routes for the HTML pages
app.get('/controller', (req, res) => {
    res.sendFile(__dirname + '/public/car-control.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/car-game.html');
});

// Socket.IO connection logic
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages from the client
    socket.on('COMMAND', (msg) => {
        console.log('Message received: ' + msg);
        // Broadcast the message to all connected clients
        io.emit('COMMAND', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server on port 3000
http.listen(3001, () => {
    console.log('Server is running on http://localhost:3000');
});
