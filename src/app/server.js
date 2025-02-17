const next = require('next');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
require('dotenv').config();

const dbConnect = require('../utils/dbConnect'); 

const dev = process.env.NODE_ENV !== 'production'; // Determine if the environment is development or production
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port }); // Create a Next.js application
const handler = app.getRequestHandler(); // Get the request handler from Next.js

app.prepare().then(() => {
  dbConnect();
  const httpServer = createServer(handler);


  const io = new Server(httpServer, {
    path: '/api/Socket', // Match the path used in the client
    cors: {
      origin: '*', // Allow all origins (update this in production)
      methods: ['GET', 'POST'],
    },
  });

  // SOCKET.IO HANDLERS 
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on('leaveChat', (chatId) => {
      socket.leave(chatId);
      console.log(`User left chat: ${chatId}`);
    });

    socket.on('typing', (chatId, user) => {
      socket.to(chatId).emit('userTyping', user);
    });

    socket.on('stopTyping', (chatId, user) => {
      socket.to(chatId).emit('userStoppedTyping', user);
    });
    
    socket.on('sendMessage', ( chatId, message, user ) => {
      const messageData = {
        chatId: chatId, 
        message: message, 
        user: user, 
        timestamp: new Date().toISOString(),
      };
      io.to(chatId).emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });


  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});