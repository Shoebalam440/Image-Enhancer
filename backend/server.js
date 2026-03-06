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

// Ensure uploads directory exists
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Created uploads directory');
}

// Middleware (More permissive CORS for debugging)
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    return callback(null, true); // Allow ALL origins temporarily to debug
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.options('*', cors()); // Enable pre-flight across-the-board
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Alam Image Enhancer API is running...');
});

app.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('Connecting to MongoDB...');
if (MONGO_URI) {
  mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => {
      console.error('❌ MongoDB Connection Error:', err.message);
      console.log('TIP: Check if your IP is whitelisted (0.0.0.0/0) in MongoDB Atlas Network Access.');
    });
} else {
  console.log('⚠️ MONGO_URI is not defined in .env.');
}

// Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start Server
console.log('Attempting to start server...');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
