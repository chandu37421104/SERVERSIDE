const express = require('express');
const {
    register,
    login,
    logout,
    resetPassword
} = require('../controllers/authController');

const router = express.Router();

// Routes for Authentication
router.post('/register', register); // Register a New Account
router.post('/login', login);       // User Login
router.post('/logout', logout);     // User Logout
router.post('/reset-password', resetPassword); // Reset Password

module.exports = router;

