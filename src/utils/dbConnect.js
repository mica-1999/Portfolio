const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Portfolio';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to the database'); // Debugging line
    return;
  }

  mongoose.connect(MONGODB_URI)
    .then(() => { console.log('Connected to the database!') })
    .catch((error) => { console.error('Error connecting to the database', error); });
};

module.exports = dbConnect;