const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
require('dotenv').config();


// Connect to the database
require('./config/db');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 36000000 }
}));

app.use(flash());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve blog.html as the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Blog-public/blog.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});