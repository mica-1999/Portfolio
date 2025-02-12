const express = require('express'); 
const next = require('next'); // Import Next.js
const http = require('http'); // Import the http module
const { Server } = require('socket.io'); // Import socket.io
require('dotenv').config(); // Load environment variables from a .env file

const dbConnect = require('../utils/dbConnect'); 

const app = express(); // Create an Express application
const dev = process.env.NODE_ENV !== 'production'; // Determine if the environment is development or production
const nextApp = next({ dev }); // Create a Next.js application
const handle = nextApp.getRequestHandler(); // Get the request handler from Next.js

nextApp.prepare().then(() => {
  dbConnect();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const server = http.createServer(app);

  // Initialize socket.io and attach it to the HTTP server
  const io = new Server(server, {
    path: '/api/Socket', // Match the path used in the client
    cors: {
      origin: '*', // Allow all origins (update this in production)
      methods: ['GET', 'POST'],
    },
  });

  console.log("Socket.IO server initialized at /api/Socket");

  // Socket.io connection handler
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Example: Handle joining a chat room
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    // Example: Handle sending a message
    socket.on('sendMessage', ({ chatId, message }) => {
      console.log(`New message in chat ${chatId}:`, message);
      io.to(chatId).emit('receiveMessage', message); // Broadcast the message to the chat room
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });


  // Handle all requests through Next.js
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});