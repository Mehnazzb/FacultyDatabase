/**
 * Database Seed Script
 * Populates the database with sample faculty data
 * Usage: npm run seed
 */

/* ===========================
   ENV SETUP (FIXED)
   =========================== */
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const mongoose = require('mongoose');
const Faculty = require('../models/Faculty');
const User = require('../models/User');

/* ===========================
   SAMPLE FACULTY DATA
   =========================== */

// Sample faculty data for Department of Information Science and Engineering
const sampleFaculty = [
    {
        employeeId: 'ISE001',
        name: 'Dr. Ramesh Kumar',
        email: 'ramesh.kumar@rit.edu.in',
        phone: '9876543210',
        gender: 'Male',
        designation: 'Professor',
        department: 'Information Science and Engineering',
        dateOfJoining: new Date('2005-07-15'),
        employmentType: 'Full-time',
        status: 'Active',
        qualifications: [
            {
                degree: 'Ph.D.',
                specialization: 'Machine Learning',
                institution: 'Indian Institute of Science',
                university: 'IISc Bangalore',
                yearOfPassing: 2004
            },
            {
                degree: 'M.Tech',
                specialization: 'Computer Science',
                institution: 'IIT Madras',
                university: 'IIT Madras',
                yearOfPassing: 1998
            },
            {
                degree: 'B.E.',
                specialization: 'Computer Science',
                institution: 'RV College of Engineering',
                university: 'Bangalore University',
                yearOfPassing: 1995
            }
        ],
        experience: [
            {
                organization: 'Ramaiah Institute of Technology',
                position: 'Professor',
                fromDate: new Date('2015-01-01'),
                description: 'Teaching and Research'
            },
            {
                organization: 'Ramaiah Institute of Technology',
                position: 'Associate Professor',
                fromDate: new Date('2010-01-01'),
                toDate: new Date('2014-12-31'),
                description: 'Teaching and Research'
            },
            {
                organization: 'Wipro Technologies',
                position: 'Senior Software Engineer',
                fromDate: new Date('2004-06-01'),
                toDate: new Date('2009-12-31'),
                description: 'Software Development'
            }
        ],
        researchInterests: [
            'Machine Learning',
            'Deep Learning',
            'Natural Language Processing',
            'Data Mining'
        ],
        publications: [
            {
                title: 'Deep Learning Approaches for Text Classification',
                type: 'Journal',
                authors: 'R. Kumar, S. Sharma, A. Patel',
                venue: 'IEEE Transactions on Neural Networks',
                year: 2022,
                doi: '10.1109/TNN.2022.123456',
                impactFactor: 4.5,
                indexing: 'SCI'
            },
            {
                title: 'A Survey of Machine Learning Techniques in Healthcare',
                type: 'Conference',
                authors: 'R. Kumar, M. Singh',
                venue: 'International Conference on Machine Learning',
                year: 2021,
                indexing: 'Scopus'
            }
        ],
        coursesTaught: [
            { courseCode: 'ISE501', courseName: 'Machine Learning', semester: 5 },
            { courseCode: 'ISE701', courseName: 'Deep Learning', semester: 7 },
            { courseCode: 'ISE801', courseName: 'Advanced Algorithms', semester: 8 }
        ],
        awards: [
            {
                title: 'Best Researcher Award',
                organization: 'VTU',
                year: 2020,
                description: 'For outstanding research contributions'
            }
        ],
        biography:
            'Dr. Ramesh Kumar is a Professor in the Department of Information Science and Engineering with over 18 years of experience.',
        officeLocation: 'ISE Building, Room 301',
        officeHours: 'Monday to Friday, 2:00 PM - 4:00 PM'
    },

    {
        employeeId: 'ISE002',
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@rit.edu.in',
        phone: '9876543211',
        gender: 'Female',
        designation: 'Associate Professor',
        department: 'Information Science and Engineering',
        dateOfJoining: new Date('2010-08-01'),
        employmentType: 'Full-time',
        status: 'Active',
        qualifications: [
            {
                degree: 'Ph.D.',
                specialization: 'Database Systems',
                institution: 'NIT Surathkal',
                university: 'NIT Karnataka',
                yearOfPassing: 2009
            },
            {
                degree: 'M.Tech',
                specialization: 'Information Technology',
                institution: 'JNTU Hyderabad',
                university: 'JNTU',
                yearOfPassing: 2004
            }
        ],
        researchInterests: [
            'Database Systems',
            'Big Data Analytics',
            'Cloud Computing',
            'NoSQL Databases'
        ],
        publications: [
            {
                title: 'Performance Analysis of NoSQL Databases for Big Data Applications',
                type: 'Journal',
                authors: 'P. Sharma, R. Kumar',
                venue: 'Journal of Database Management',
                year: 2023,
                impactFactor: 3.2,
                indexing: 'Scopus'
            }
        ],
        coursesTaught: [
            { courseCode: 'ISE401', courseName: 'Database Management Systems', semester: 4 },
            { courseCode: 'ISE601', courseName: 'Big Data Analytics', semester: 6 }
        ],
        biography:
            'Dr. Priya Sharma is an Associate Professor specializing in Database Systems and Big Data Analytics.',
        officeLocation: 'ISE Building, Room 205'
    }
];

/* ===========================
   DEFAULT ADMIN USER
   =========================== */

const defaultAdmin = {
    username: 'admin',
    email: 'admin@rit.edu.in',
    password: 'admin123',
    name: 'System Administrator',
    role: 'admin',
    isActive: true
};

/* ===========================
   SEED FUNCTION
   =========================== */

const seedDatabase = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not found in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        console.log('🧹 Clearing existing data...');
        await Faculty.deleteMany({});
        await User.deleteMany({});

        console.log('🌱 Inserting faculty data...');
        const insertedFaculty = await Faculty.insertMany(sampleFaculty);
        console.log(`✅ ${insertedFaculty.length} faculty members inserted`);

        console.log('👤 Creating admin user...');
        const admin = await User.create(defaultAdmin);
        console.log(`✅ Admin user created: ${admin.username}`);

        console.log('\n========================================');
        console.log('  🎉 Database seeded successfully!');
        console.log('========================================');
        console.log(`  Faculty members: ${insertedFaculty.length}`);
        console.log(`  Admin user: ${admin.username}`);
        console.log(`  Admin password: admin123`);
        console.log('========================================\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();