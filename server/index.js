const express = require('express');
const http = require('http'); // Require the HTTP module
const socketIo = require('socket.io'); // Require Socket.io
const app = express();
const server = http.createServer(app); // Create an HTTP server using your Express app

const db = require('./models');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/rating', ratingRoutes);
app.use('/chats', chatRoutes);
app.use('/chats/messages', messageRoutes);

db.sequelize.sync().then(() => {
    server.listen(5000, () => {
        console.log('Connected to server');
    });
});
const io = socketIo(server,{
    cors:{
        origin: 'http://localhost:3000',
    },
}); // Create a Socket.io instance

// Create a Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle chat messages
    socket.on('chat message', (message) => {
        console.log("Connected to the chat");
        // Broadcast the message to all connected clients
        io.emit('chat message', message);
    });
    socket.on("typing", () => {
        socket.emit("typing");
    });

    socket.on("stop typing", (room) => {
        socket.emit("stop typing");
    });
    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
