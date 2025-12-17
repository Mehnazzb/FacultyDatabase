const express = require('express');
const router = express.Router();
const {
    getAllFaculty,
    getFacultyById,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getFacultyStats,
    searchFaculty
} = require('../controllers/facultyController');
const { protect, authorize } = require('../middleware/auth');

/**
 * Faculty Routes
 * RESTful API routes for faculty management
 */

// Public routes
router.get('/stats', getFacultyStats);
router.get('/search', searchFaculty);
router.get('/', getAllFaculty);
router.get('/:id', getFacultyById);

// Protected routes (require authentication)
router.post('/', protect, authorize('admin', 'editor'), createFaculty);
router.put('/:id', protect, authorize('admin', 'editor'), updateFaculty);
router.delete('/:id', protect, authorize('admin'), deleteFaculty);

module.exports = router;
