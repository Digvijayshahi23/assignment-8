const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    if (!uri) {
      if (process.env.NODE_ENV === 'production') {
        console.error('CRITICAL ERROR: MONGODB_URI environment variable is missing.');
        console.error('You must add your MongoDB connection string in Vercel Project Settings > Environment Variables.');
        return; // Return without connecting so it doesn't crash the lambda initialization
      }
      
      console.log('MONGODB_URI not found. Using In-Memory MongoDB for local development...');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
      return;
    }

    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
