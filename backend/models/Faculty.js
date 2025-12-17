const mongoose = require('mongoose');

/**
 * Faculty Schema
 * Comprehensive schema for storing faculty information
 * for the Department of Information Science and Engineering
 */
const FacultySchema = new mongoose.Schema({
    // Personal Information
    employeeId: {
        type: String,
        required: [true, 'Employee ID is required'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        trim: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    profileImage: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        trim: true
    },

    // Professional Information
    designation: {
        type: String,
        required: [true, 'Designation is required'],
        enum: [
            'Professor',
            'Associate Professor',
            'Assistant Professor',
            'Senior Lecturer',
            'Lecturer',
            'Guest Faculty',
            'Adjunct Faculty',
            'Professor Emeritus',
            'Head of Department'
        ]
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        default: 'Information Science and Engineering',
        trim: true
    },
    dateOfJoining: {
        type: Date,
        required: [true, 'Date of joining is required']
    },
    employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Visiting'],
        default: 'Full-time'
    },
    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Sabbatical', 'Retired', 'Resigned'],
        default: 'Active'
    },

    // Educational Qualifications
    qualifications: [{
        degree: {
            type: String,
            required: true,
            trim: true
        },
        specialization: {
            type: String,
            trim: true
        },
        institution: {
            type: String,
            required: true,
            trim: true
        },
        university: {
            type: String,
            trim: true
        },
        yearOfPassing: {
            type: Number
        },
        percentage: {
            type: Number
        }
    }],

    // Work Experience
    experience: [{
        organization: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true,
            trim: true
        },
        fromDate: {
            type: Date
        },
        toDate: {
            type: Date
        },
        description: {
            type: String,
            trim: true
        }
    }],

    // Research and Publications
    researchInterests: [{
        type: String,
        trim: true
    }],
    publications: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            enum: ['Journal', 'Conference', 'Book', 'Book Chapter', 'Patent', 'Other'],
            default: 'Journal'
        },
        authors: {
            type: String,
            trim: true
        },
        venue: {
            type: String,
            trim: true
        },
        year: {
            type: Number
        },
        doi: {
            type: String,
            trim: true
        },
        impactFactor: {
            type: Number
        },
        indexing: {
            type: String,
            enum: ['SCI', 'Scopus', 'Web of Science', 'UGC', 'Other', 'None'],
            default: 'None'
        }
    }],

    // Courses Taught
    coursesTaught: [{
        courseCode: {
            type: String,
            trim: true
        },
        courseName: {
            type: String,
            required: true,
            trim: true
        },
        semester: {
            type: Number,
            min: 1,
            max: 8
        },
        academicYear: {
            type: String,
            trim: true
        }
    }],

    // Awards and Achievements
    awards: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        organization: {
            type: String,
            trim: true
        },
        year: {
            type: Number
        },
        description: {
            type: String,
            trim: true
        }
    }],

    // Administrative Responsibilities
    administrativeRoles: [{
        role: {
            type: String,
            required: true,
            trim: true
        },
        fromDate: {
            type: Date
        },
        toDate: {
            type: Date
        },
        description: {
            type: String,
            trim: true
        }
    }],

    // Additional Information
    biography: {
        type: String,
        maxlength: [2000, 'Biography cannot exceed 2000 characters']
    },
    officeLocation: {
        type: String,
        trim: true
    },
    officeHours: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    linkedIn: {
        type: String,
        trim: true
    },
    googleScholar: {
        type: String,
        trim: true
    },
    orcid: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for better query performance
FacultySchema.index({ name: 'text', email: 'text', designation: 'text' });
FacultySchema.index({ department: 1 });
FacultySchema.index({ designation: 1 });
FacultySchema.index({ status: 1 });

// Virtual for total experience in years
FacultySchema.virtual('totalExperienceYears').get(function () {
    if (!this.experience || this.experience.length === 0) return 0;

    let totalMonths = 0;
    this.experience.forEach(exp => {
        const from = exp.fromDate ? new Date(exp.fromDate) : new Date();
        const to = exp.toDate ? new Date(exp.toDate) : new Date();
        const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
        totalMonths += months;
    });
    return Math.round(totalMonths / 12 * 10) / 10;
});

// Virtual for publication count
FacultySchema.virtual('publicationCount').get(function () {
    return this.publications ? this.publications.length : 0;
});

// Ensure virtuals are included in JSON output
FacultySchema.set('toJSON', { virtuals: true });
FacultySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Faculty', FacultySchema);
