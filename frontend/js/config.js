/**
 * Application Configuration
 * Central configuration for the Faculty Database Management System
 */

const CONFIG = {
    // API Base URL - change this for production
    API_BASE_URL: 'http://localhost:5000/api',

    // Application Settings
    APP_NAME: 'Faculty Database Management System',
    DEPARTMENT: 'Department of Information Science and Engineering',
    INSTITUTION: 'Ramaiah Institute of Technology',

    // Pagination
    DEFAULT_PAGE_SIZE: 10,

    // Local Storage Keys
    STORAGE_KEYS: {
        TOKEN: 'fdms_token',
        USER: 'fdms_user',
        REMEMBER_ME: 'fdms_remember'
    },

    // Designations
    DESIGNATIONS: [
        'Professor',
        'Associate Professor',
        'Assistant Professor',
        'Senior Lecturer',
        'Lecturer',
        'Guest Faculty',
        'Adjunct Faculty',
        'Professor Emeritus',
        'Head of Department'
    ],

    // Faculty Status Options
    STATUS_OPTIONS: [
        'Active',
        'On Leave',
        'Sabbatical',
        'Retired',
        'Resigned'
    ],

    // Employment Types
    EMPLOYMENT_TYPES: [
        'Full-time',
        'Part-time',
        'Contract',
        'Visiting'
    ],

    // Publication Types
    PUBLICATION_TYPES: [
        'Journal',
        'Conference',
        'Book',
        'Book Chapter',
        'Patent',
        'Other'
    ],

    // Indexing Options
    INDEXING_OPTIONS: [
        'SCI',
        'Scopus',
        'Web of Science',
        'UGC',
        'Other',
        'None'
    ]
};

// Freeze configuration to prevent modification
Object.freeze(CONFIG);
Object.freeze(CONFIG.STORAGE_KEYS);
