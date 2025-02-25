const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to the database');
    return; // If already connected, don't connect again
  }

  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};
module.exports = dbConnect;