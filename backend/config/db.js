const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    // Check if MongoDB URI exists
    if (!process.env.MONGODB_URI) {
      console.log('MongoDB URI not found. Skipping database connection.');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);

    // Do NOT stop server
    console.log('Continuing without MongoDB...');
  }
};

module.exports = connectDB;