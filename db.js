const mongoose = require('mongoose');

// MongoDB URL
const mongoURL = "mongodb://localhost:27017/hotel";

// Setup MongoDB connection
mongoose.connect(mongoURL);

// Mongoose maintain default connection object representing the MongoDB connection
const db = mongoose.connection;

// Event listeners for Database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
