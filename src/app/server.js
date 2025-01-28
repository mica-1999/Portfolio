const express = require('express'); // Import the Express framework
const next = require('next'); // Import Next.js
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Load environment variables from a .env file

const dbConnect = require('../utils/dbConnect'); // Import the dbConnect function to connect to the database

const app = express(); // Create an Express application
const dev = process.env.NODE_ENV !== 'production'; // Determine if the environment is development or production
const nextApp = next({ dev }); // Create a Next.js application
const handle = nextApp.getRequestHandler(); // Get the request handler from Next.js

nextApp.prepare().then(() => {
  // Connect to the database
  dbConnect();

  // Middleware to parse JSON bodies
  app.use(express.json());
  // Middleware to parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  // Handle all requests through Next.js
  app.all('*', (req, res) => {
    return handle(req, res); // This sends requests to the correct Next.js page
  });

  // Start the server
  const PORT = process.env.PORT || 3000; // Determine the port to listen on
  app.listen(PORT, (err) => {
    if (err) throw err; // Throw an error if there is an issue starting the server
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
  });
});