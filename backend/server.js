console.log('Server starting...');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.enable('trust proxy');

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// Routes
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

// Passport Config
require('./config/passport');

app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Serve uploads folder statically (for local dev)
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Alam Image Enhancer API is running...');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
} else {
  console.log('MONGO_URI is not defined in .env. Skipping DB connection.');
}

// Start Server
console.log('Attempting to start server...');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
