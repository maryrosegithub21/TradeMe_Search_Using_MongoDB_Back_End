
const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

async function connectToDB() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
    isConnected = false;
  });
}

module.exports = connectToDB;