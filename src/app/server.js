const express = require('express');
const next = require('next');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
require('dotenv').config();

const dbConnect = require('./utils/dbConnect'); // Correctly import the dbConnect function

const app = express();
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './src/app' }); // Specify the custom directory
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  // Connect to the database
  dbConnect();

  // Middleware to parse JSON bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 36000000 },
  }));

  app.use(flash());

  // Serve static files from the "public" directory
  app.use(express.static(path.join(__dirname, '../../public')));

  // Custom API routes or other logic
  // For example: app.use('/api', apiRoutes);

  // Handle all requests through Next.js
  app.all('*', (req, res) => {
    return handle(req, res);  // This sends requests to the correct Next.js page
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});