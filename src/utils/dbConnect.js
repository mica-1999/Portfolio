const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to the database');
    return; // If already connected, don't connect again
  }

  try {
    await mongoose.connect(MONGODB_URI); // Removed deprecated options
    if (mongoose.connection.readyState === 1) {
      console.log('Connected to MongoDB Atlas');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('Could not connect to MongoDB Atlas. Check network, credentials, or IP whitelist.');
    }
  }
};

module.exports = dbConnect;
