const Faculty = require('../models/Faculty');

/**
 * Faculty Controller
 * Handles all CRUD operations for faculty records
 */

// @desc    Get all faculty members
// @route   GET /api/faculty
// @access  Public
exports.getAllFaculty = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            designation,
            department,
            status,
            sortBy = 'name',
            sortOrder = 'asc'
        } = req.query;

        // Build query
        let query = {};

        // Search filter (text search on name, email)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { employeeId: { $regex: search, $options: 'i' } }
            ];
        }

        // Designation filter
        if (designation) {
            query.designation = designation;
        }

        // Department filter
        if (department) {
            query.department = { $regex: department, $options: 'i' };
        }

        // Status filter
        if (status) {
            query.status = status;
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query with pagination
        const faculty = await Faculty.find(query)
            .select('-__v')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Faculty.countDocuments(query);

        res.status(200).json({
            success: true,
            count: faculty.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            data: faculty
        });
    } catch (error) {
        console.error('Error fetching faculty:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching faculty',
            error: error.message
        });
    }
};

// @desc    Get single faculty member
// @route   GET /api/faculty/:id
// @access  Public
exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id).select('-__v');

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: 'Faculty member not found'
            });
        }

        res.status(200).json({
            success: true,
            data: faculty
        });
    } catch (error) {
        console.error('Error fetching faculty:', error);

        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Faculty member not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching faculty',
            error: error.message
        });
    }
};

// @desc    Create new faculty member
// @route   POST /api/faculty
// @access  Private (Admin)
exports.createFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Faculty member created successfully',
            data: faculty
        });
    } catch (error) {
        console.error('Error creating faculty:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `A faculty member with this ${field} already exists`
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while creating faculty',
            error: error.message
        });
    }
};

// @desc    Update faculty member
// @route   PUT /api/faculty/:id
// @access  Private (Admin)
exports.updateFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        ).select('-__v');

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: 'Faculty member not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Faculty member updated successfully',
            data: faculty
        });
    } catch (error) {
        console.error('Error updating faculty:', error);

        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Faculty member not found'
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `A faculty member with this ${field} already exists`
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while updating faculty',
            error: error.message
        });
    }
};

// @desc    Delete faculty member
// @route   DELETE /api/faculty/:id
// @access  Private (Admin)
exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: 'Faculty member not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Faculty member deleted successfully',
            data: {}
        });
    } catch (error) {
        console.error('Error deleting faculty:', error);

        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Faculty member not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while deleting faculty',
            error: error.message
        });
    }
};

// @desc    Get faculty statistics
// @route   GET /api/faculty/stats
// @access  Public
exports.getFacultyStats = async (req, res) => {
    try {
        const stats = await Faculty.aggregate([
            {
                $facet: {
                    total: [{ $count: 'count' }],
                    byDesignation: [
                        { $group: { _id: '$designation', count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ],
                    byDepartment: [
                        { $group: { _id: '$department', count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ],
                    byStatus: [
                        { $group: { _id: '$status', count: { $sum: 1 } } }
                    ],
                    byGender: [
                        { $group: { _id: '$gender', count: { $sum: 1 } } }
                    ],
                    totalPublications: [
                        { $unwind: { path: '$publications', preserveNullAndEmptyArrays: true } },
                        { $count: 'count' }
                    ]
                }
            }
        ]);

        const result = stats[0];

        res.status(200).json({
            success: true,
            data: {
                totalFaculty: result.total[0]?.count || 0,
                byDesignation: result.byDesignation,
                byDepartment: result.byDepartment,
                byStatus: result.byStatus,
                byGender: result.byGender,
                totalPublications: result.totalPublications[0]?.count || 0
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching statistics',
            error: error.message
        });
    }
};

// @desc    Search faculty by multiple criteria
// @route   GET /api/faculty/search
// @access  Public
exports.searchFaculty = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Search query must be at least 2 characters'
            });
        }

        const faculty = await Faculty.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { employeeId: { $regex: q, $options: 'i' } },
                { 'qualifications.specialization': { $regex: q, $options: 'i' } },
                { researchInterests: { $regex: q, $options: 'i' } }
            ]
        })
            .select('name email designation department profileImage employeeId')
            .limit(20);

        res.status(200).json({
            success: true,
            count: faculty.length,
            data: faculty
        });
    } catch (error) {
        console.error('Error searching faculty:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while searching',
            error: error.message
        });
    }
};
