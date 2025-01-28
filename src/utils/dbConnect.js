const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Portfolio';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // If already connected, don't connect again
  }

  try {
    await mongoose.connect(MONGODB_URI); // Wait for the connection to MongoDB
    console.log('Connected to the database!'); // Log success message
  } catch (error) {
    console.error('Error connecting to the database', error); // Log error message if connection fails
  }
};
module.exports = dbConnect;