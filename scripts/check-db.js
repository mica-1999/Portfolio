// Script to check database connection and user data
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function checkDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB!');
    
    // Get the database
    const db = mongoose.connection.db;
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Check users collection
    if (collections.some(c => c.name === 'users')) {
      const users = await db.collection('users').find({}).toArray();
      console.log(`Found ${users.length} users`);
      
      // Display user properties without showing sensitive data
      users.forEach((user, index) => {
        const { password, ...safeUser } = user;
        console.log(`User ${index + 1}:`, {
          ...safeUser,
          hasPassword: !!password
        });
      });
    } else {
      console.log('No users collection found!');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkDatabase();
