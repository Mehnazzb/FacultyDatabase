const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getMe,
    updateProfile,
    changePassword,
    getAllUsers
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

/**
 * Authentication Routes
 */

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.put('/password', protect, changePassword);

// Admin only routes
router.get('/users', protect, authorize('admin'), getAllUsers);

module.exports = router;
