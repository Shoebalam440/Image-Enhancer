const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    registerUser,
    loginUser,
    getMe,
    googleAuthCallback
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    googleAuthCallback
);

module.exports = router;
