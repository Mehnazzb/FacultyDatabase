# Faculty Database Management System - Project Report

## 1. Project Overview

### 1.1 Project Description

The **Faculty Database Management System (FDMS)** is a comprehensive web-based application designed to manage and maintain faculty information for the Department of Information Science and Engineering at Ramaiah Institute of Technology, Bangalore.

The system provides a centralized platform for storing, retrieving, updating, and managing faculty-related data, including personal information, educational qualifications, work experience, research publications, courses taught, and administrative roles.

The application leverages **MongoDB** as the NoSQL database to store faculty documents, providing flexibility in schema design and efficient handling of complex, nested data structures typically associated with academic faculty profiles. The frontend is built using vanilla HTML, CSS, and JavaScript, while the backend uses Node.js with Express.js framework to provide RESTful API endpoints.

### 1.2 Requirements Collection

**Functional Requirements:**
1. Store comprehensive faculty information including personal details, qualifications, and publications
2. Provide CRUD (Create, Read, Update, Delete) operations for faculty records
3. Enable searching and filtering of faculty based on various criteria
4. Implement secure authentication for administrative access
5. Display statistics and analytics about faculty data
6. Support profile pictures and document uploads (profile image URLs)
7. Generate reports and summaries of faculty data

**Non-Functional Requirements:**
1. Responsive web interface accessible on desktop and mobile devices
2. Fast query response times (< 500ms for typical queries)
3. Secure password storage using bcrypt hashing
4. JWT-based authentication with token expiration
5. RESTful API design for easy integration
6. Scalable database architecture using MongoDB Atlas cloud

**Data Requirements:**
- Personal Information (name, email, phone, address)
- Professional Information (designation, department, joining date)
- Educational Qualifications (degrees, institutions, years)
- Work Experience (organizations, positions, duration)
- Publications (journals, conferences, books, patents)
- Courses Taught (course codes, names, semesters)
- Awards and Achievements
- Research Interests
- Administrative Roles

### 1.3 NoSQL Database Used and Why

**Database Selected: MongoDB**

MongoDB was selected as the NoSQL database for this project for the following reasons:

1. **Document Data Model**: MongoDB's document-oriented data model perfectly suits faculty profiles, which contain complex, nested data structures (qualifications, publications, courses).

2. **Schema Flexibility**: Faculty data can have varying attributes (some faculty have many publications, others have more administrative roles). MongoDB's flexible schema handles this naturally.

3. **Scalability**: MongoDB provides horizontal scaling capabilities through sharding, which can handle growing data volumes as more faculty are added.

4. **Rich Query Language**: MongoDB Query Language (MQL) supports:
   - Complex queries with multiple filter conditions
   - Text search across multiple fields
   - Aggregation pipelines for statistics

5. **Cloud Deployment**: MongoDB Atlas provides a fully managed cloud database service with:
   - Free tier for development and small deployments
   - Automatic backups and monitoring
   - Global distribution options

6. **Integration with Node.js**: Mongoose ODM provides excellent integration with Node.js, offering schema validation, middleware support, and easy query building.

### 1.4 Application of the Project

**Primary Applications:**

1. **Faculty Information Management**: Centralized storage and management of all faculty-related data for the department.

2. **Public Faculty Directory**: Provides a searchable directory for students, visitors, and other stakeholders to find faculty information.

3. **Academic Profile Tracking**: Tracks research publications, courses taught, and professional achievements over time.

4. **Administrative Decision Support**: Statistics and reports help in administrative decisions about faculty assignments and promotions.

5. **Accreditation Documentation**: Supports NAAC/NBA accreditation processes by maintaining organized faculty records.

**Target Users:**
- Department Administration
- Faculty Members (for viewing and updating their profiles)
- Students (for finding faculty contact information)
- External Stakeholders (Research collaborators, recruiters)

---

## 2. System Requirements

### 2.1 Software Requirements

| Component | Requirement |
|-----------|-------------|
| Operating System | Windows 10+, macOS 10.14+, Ubuntu 18.04+ |
| Runtime | Node.js v14.0 or higher |
| Package Manager | npm v6.0 or higher |
| Database | MongoDB Atlas (Cloud) or MongoDB v4.4+ (Local) |
| Web Browser | Chrome 80+, Firefox 75+, Safari 13+, Edge 80+ |
| Text Editor/IDE | VS Code, Sublime Text, or any preferred editor |

**Backend Dependencies:**
- express (v4.18+) - Web framework
- mongoose (v8.0+) - MongoDB ODM
- bcryptjs (v2.4+) - Password hashing
- jsonwebtoken (v9.0+) - Authentication
- cors (v2.8+) - Cross-origin resource sharing
- dotenv (v16.0+) - Environment variables

### 2.2 Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Processor | Dual-core 2.0 GHz | Quad-core 2.5 GHz+ |
| RAM | 4 GB | 8 GB |
| Storage | 500 MB free space | 1 GB free space |
| Network | Internet connection | Broadband connection |
| Display | 1280x720 resolution | 1920x1080 resolution |

**Note**: Since the database is hosted on MongoDB Atlas (cloud), no local database server requirements apply.

---

## 3. Database Design

### 3.1 Data Model

The Faculty Database Management System uses MongoDB's **Document Data Model**, which stores data as BSON (Binary JSON) documents. This model is ideal for faculty data because:

1. **Hierarchical Data**: Faculty profiles contain nested structures like multiple qualifications, publications, and courses.

2. **Variable Schema**: Different faculty may have different numbers of publications or qualifications.

3. **Self-Contained Documents**: Each faculty document contains all related information, reducing the need for joins.

**Data Organization:**
- **Database**: `fdms` (Faculty Database Management System)
- **Collections**: `faculties`, `users`
- **Documents**: Individual faculty records as JSON-like documents

### 3.2 Structure

#### Database: fdms

#### Collections:

**1. faculties Collection**

Stores all faculty member information.

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique document identifier (auto-generated) |
| employeeId | String | Unique employee ID (e.g., ISE001) |
| name | String | Full name of faculty |
| email | String | Email address (unique) |
| phone | String | 10-digit phone number |
| dateOfBirth | Date | Date of birth |
| gender | String | Male/Female/Other |
| profileImage | String | URL to profile image |
| address | String | Residential address |
| designation | String | Professor/Associate Professor/etc. |
| department | String | Department name |
| dateOfJoining | Date | Date of joining the institution |
| employmentType | String | Full-time/Part-time/Contract |
| status | String | Active/On Leave/Retired |
| qualifications | Array | Array of qualification objects |
| experience | Array | Array of experience objects |
| researchInterests | Array | Array of strings |
| publications | Array | Array of publication objects |
| coursesTaught | Array | Array of course objects |
| awards | Array | Array of award objects |
| administrativeRoles | Array | Array of role objects |
| biography | String | Brief biography (max 2000 chars) |
| officeLocation | String | Office room location |
| officeHours | String | Consultation hours |
| website | String | Personal website URL |
| linkedIn | String | LinkedIn profile URL |
| googleScholar | String | Google Scholar profile URL |
| orcid | String | ORCID identifier |
| createdAt | Date | Document creation timestamp |
| updatedAt | Date | Last modification timestamp |

**Nested Objects:**

*Qualification Object:*
```javascript
{
  degree: String,         // Ph.D., M.Tech, B.E.
  specialization: String, // Area of specialization
  institution: String,    // Institution name
  university: String,     // University name
  yearOfPassing: Number,  // Year of completion
  percentage: Number      // Marks percentage
}
```

*Publication Object:*
```javascript
{
  title: String,          // Publication title
  type: String,           // Journal/Conference/Book
  authors: String,        // Author names
  venue: String,          // Journal/Conference name
  year: Number,           // Publication year
  doi: String,            // Digital Object Identifier
  impactFactor: Number,   // Journal impact factor
  indexing: String        // SCI/Scopus/UGC/None
}
```

*Course Object:*
```javascript
{
  courseCode: String,     // Course code (e.g., ISE501)
  courseName: String,     // Course name
  semester: Number,       // Semester (1-8)
  academicYear: String    // Academic year
}
```

**2. users Collection**

Stores admin user accounts.

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier |
| username | String | Login username (unique) |
| email | String | Email address (unique) |
| password | String | Bcrypt hashed password |
| name | String | Display name |
| role | String | admin/editor/viewer |
| isActive | Boolean | Account status |
| lastLogin | Date | Last login timestamp |
| createdAt | Date | Account creation date |
| updatedAt | Date | Last update timestamp |

**Relationships:**

The document model avoids traditional relationships by embedding related data. However, logical relationships exist:

1. **One-to-Many (Embedded)**: Faculty → Qualifications, Publications, Courses
2. **User-Faculty** (Implicit): Admins manage faculty records (no direct reference)

---

## 4. Implementation Steps

### 4.1 Installation & Setup

**Step 1: Install Node.js**
```bash
# Download from https://nodejs.org/
# Verify installation
node --version
npm --version
```

**Step 2: Set up MongoDB Atlas**
1. Create account at mongodb.com/cloud/atlas
2. Create a free cluster (M0 tier)
3. Configure database user and password
4. Add IP address to whitelist
5. Get connection string

**Step 3: Clone and configure project**
```bash
cd faculty-database-management-system/backend
cp .env.example .env
# Edit .env with MongoDB connection string
```

**Step 4: Install dependencies**
```bash
npm install
```

### 4.2 Creating the Database

MongoDB Atlas automatically creates the database when the first document is inserted.

**Connection Configuration (config/db.js):**
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
```

**Environment Variables (.env):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fdms
```

### 4.3 Creating Collections / Keys / Tables

Collections are created automatically when documents are first inserted. The schema is defined using Mongoose:

**Faculty Schema Definition (models/Faculty.js):**
```javascript
const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true,
        enum: ['Professor', 'Associate Professor', 'Assistant Professor', ...]
    },
    qualifications: [{
        degree: String,
        specialization: String,
        institution: String,
        yearOfPassing: Number
    }],
    publications: [{
        title: String,
        type: { type: String, enum: ['Journal', 'Conference', 'Book'] },
        year: Number
    }]
}, { timestamps: true });

// Create indexes for better query performance
FacultySchema.index({ name: 'text', email: 'text' });
FacultySchema.index({ department: 1 });
FacultySchema.index({ designation: 1 });

module.exports = mongoose.model('Faculty', FacultySchema);
```

### 4.4 Inserting Data

**Using Mongoose (Node.js):**
```javascript
const Faculty = require('./models/Faculty');

// Create a new faculty document
const newFaculty = await Faculty.create({
    employeeId: 'ISE001',
    name: 'Dr. Ramesh Kumar',
    email: 'ramesh.kumar@rit.edu.in',
    phone: '9876543210',
    designation: 'Professor',
    department: 'Information Science and Engineering',
    dateOfJoining: new Date('2005-07-15'),
    status: 'Active',
    qualifications: [
        {
            degree: 'Ph.D.',
            specialization: 'Machine Learning',
            institution: 'Indian Institute of Science',
            yearOfPassing: 2004
        }
    ],
    researchInterests: ['Machine Learning', 'Deep Learning']
});
```

**Using MongoDB Shell:**
```javascript
db.faculties.insertOne({
    employeeId: "ISE001",
    name: "Dr. Ramesh Kumar",
    email: "ramesh.kumar@rit.edu.in",
    designation: "Professor",
    department: "Information Science and Engineering",
    dateOfJoining: new Date("2005-07-15")
});
```

### 4.5 Reading Data (Queries)

**Find all faculty:**
```javascript
const allFaculty = await Faculty.find({});
```

**Find by designation:**
```javascript
const professors = await Faculty.find({ designation: 'Professor' });
```

**Find by name (partial match):**
```javascript
const results = await Faculty.find({
    name: { $regex: 'Ramesh', $options: 'i' }
});
```

**Find with pagination:**
```javascript
const faculty = await Faculty.find({})
    .skip(0)       // Skip first N documents
    .limit(10)     // Return only 10 documents
    .sort({ name: 1 }); // Sort by name ascending
```

**Aggregation for statistics:**
```javascript
const stats = await Faculty.aggregate([
    {
        $group: {
            _id: '$designation',
            count: { $sum: 1 }
        }
    }
]);
```

### 4.6 Updating Data

**Update single document:**
```javascript
await Faculty.findByIdAndUpdate(
    '507f1f77bcf86cd799439011',
    { designation: 'Associate Professor', status: 'On Leave' },
    { new: true, runValidators: true }
);
```

**Update by condition:**
```javascript
await Faculty.updateOne(
    { employeeId: 'ISE001' },
    { $set: { phone: '9999999999' } }
);
```

**Add to array (publication):**
```javascript
await Faculty.findByIdAndUpdate(
    '507f1f77bcf86cd799439011',
    {
        $push: {
            publications: {
                title: 'New Research Paper',
                type: 'Journal',
                year: 2024
            }
        }
    }
);
```

### 4.7 Deleting Data

**Delete single document:**
```javascript
await Faculty.findByIdAndDelete('507f1f77bcf86cd799439011');
```

**Delete by condition:**
```javascript
await Faculty.deleteOne({ employeeId: 'ISE011' });
```

**Delete multiple documents:**
```javascript
await Faculty.deleteMany({ status: 'Resigned' });
```

---

## 5. Sample Queries/Operations

### CREATE Operations

**1. Insert a new faculty member:**
```javascript
db.faculties.insertOne({
    employeeId: "ISE012",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@rit.edu.in",
    designation: "Associate Professor",
    department: "Information Science and Engineering",
    dateOfJoining: new Date("2010-08-01"),
    status: "Active"
});
```

**2. Insert multiple faculty members:**
```javascript
db.faculties.insertMany([
    { employeeId: "ISE013", name: "Prof. Anil Kumar", ... },
    { employeeId: "ISE014", name: "Dr. Lakshmi N", ... }
]);
```

**3. Insert faculty with embedded qualifications:**
```javascript
db.faculties.insertOne({
    employeeId: "ISE015",
    name: "Dr. Kavitha S",
    qualifications: [
        { degree: "Ph.D.", specialization: "Data Mining", institution: "IIT Delhi" },
        { degree: "M.Tech", specialization: "Computer Science", institution: "NIT Surathkal" }
    ]
});
```

**4. Insert with publications array:**
```javascript
db.faculties.insertOne({
    employeeId: "ISE016",
    name: "Dr. Mohammed Imran",
    publications: [
        { title: "Research Paper 1", type: "Journal", year: 2023, indexing: "SCI" },
        { title: "Conference Paper 1", type: "Conference", year: 2022, venue: "IEEE" }
    ]
});
```

**5. Create with complete data:**
```javascript
db.faculties.insertOne({
    employeeId: "ISE017",
    name: "Dr. Complete Faculty",
    email: "complete@rit.edu.in",
    phone: "9876543210",
    designation: "Professor",
    department: "Information Science and Engineering",
    dateOfJoining: new Date("2000-01-01"),
    status: "Active",
    qualifications: [{ degree: "Ph.D.", institution: "IISc" }],
    publications: [{ title: "Paper", type: "Journal" }],
    coursesTaught: [{ courseName: "ML", semester: 5 }],
    researchInterests: ["AI", "ML", "DL"]
});
```

### READ Operations

**1. Find all faculty in a department:**
```javascript
db.faculties.find({ 
    department: "Information Science and Engineering" 
});
```

**2. Find faculty by designation with projection:**
```javascript
db.faculties.find(
    { designation: "Professor" },
    { name: 1, email: 1, department: 1 }
);
```

**3. Find faculty with SCI publications:**
```javascript
db.faculties.find({
    "publications.indexing": "SCI"
});
```

**4. Full-text search:**
```javascript
db.faculties.find({
    $text: { $search: "machine learning" }
});
```

**5. Aggregation to count by designation:**
```javascript
db.faculties.aggregate([
    { $group: { _id: "$designation", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]);
```

### UPDATE Operations

**1. Update designation:**
```javascript
db.faculties.updateOne(
    { employeeId: "ISE001" },
    { $set: { designation: "Head of Department" } }
);
```

**2. Add a new publication:**
```javascript
db.faculties.updateOne(
    { employeeId: "ISE001" },
    { $push: { publications: { title: "New Paper", type: "Journal", year: 2024 } } }
);
```

**3. Update multiple faculty status:**
```javascript
db.faculties.updateMany(
    { status: "Active", designation: "Professor" },
    { $set: { status: "Senior Faculty" } }
);
```

**4. Increment publication count (if stored):**
```javascript
db.faculties.updateOne(
    { employeeId: "ISE001" },
    { $inc: { publicationCount: 1 } }
);
```

**5. Update nested array element:**
```javascript
db.faculties.updateOne(
    { employeeId: "ISE001", "qualifications.degree": "Ph.D." },
    { $set: { "qualifications.$.yearOfPassing": 2005 } }
);
```

### DELETE Operations

**1. Delete a single faculty:**
```javascript
db.faculties.deleteOne({ employeeId: "ISE017" });
```

**2. Delete by ObjectId:**
```javascript
db.faculties.deleteOne({ _id: ObjectId("507f1f77bcf86cd799439011") });
```

**3. Delete all retired faculty:**
```javascript
db.faculties.deleteMany({ status: "Retired" });
```

**4. Delete faculty without publications:**
```javascript
db.faculties.deleteMany({ 
    $or: [
        { publications: { $exists: false } },
        { publications: { $size: 0 } }
    ]
});
```

**5. Remove a publication from array:**
```javascript
db.faculties.updateOne(
    { employeeId: "ISE001" },
    { $pull: { publications: { title: "Paper to Remove" } } }
);
```

---

## 6. Application Design

### Programming Languages Used

| Layer | Technology |
|-------|------------|
| Backend | JavaScript (Node.js) |
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Database ODM | JavaScript (Mongoose) |

### Code Snippet for Connecting to Database

**config/db.js:**
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Mongoose 6+ doesn't need these options
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
```

**server.js (Main Entry Point):**
```javascript
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### Screenshots

*Note: Screenshots would be captured from the running application showing:*
1. Faculty Directory (Home Page)
2. Admin Login Page
3. Admin Dashboard with Statistics
4. Faculty Profile Detail Page
5. Add/Edit Faculty Form
6. Search and Filter Results

---

## 7. Challenges Faced

1. **Schema Design for Nested Documents**: Designing an appropriate schema that balances embedding vs. referencing for faculty data. Resolved by embedding frequently accessed data (qualifications, publications) while keeping the document size manageable.

2. **MongoDB Atlas Connection**: Initial connection issues due to IP whitelisting. Resolved by properly configuring network access and using the correct connection string format.

3. **Complex Aggregation Queries**: Building aggregation pipelines for statistics (count by designation, total publications). Resolved by studying MongoDB aggregation framework documentation.

4. **Authentication Implementation**: Implementing secure JWT-based authentication with role-based access control. Used bcryptjs for password hashing and jsonwebtoken for token management.

5. **Form Handling for Nested Arrays**: Managing dynamic form fields for qualifications and publications on the frontend. Implemented JavaScript functions to dynamically add/remove form fields.

6. **Pagination and Filtering**: Implementing efficient pagination with multiple filters. Used Mongoose query methods with skip, limit, and compound queries.

7. **CORS Configuration**: Cross-origin resource sharing issues between frontend and backend. Configured CORS middleware properly for development and production environments.

---

## 8. Conclusion

The Faculty Database Management System successfully demonstrates the practical application of MongoDB as a NoSQL database for managing complex, hierarchical data structures in an academic context.

**Key Achievements:**

1. **Successful Implementation**: Developed a fully functional web application with CRUD operations for faculty management.

2. **MongoDB Integration**: Effectively used MongoDB's document model to store and query faculty data with nested structures.

3. **Modern Web Stack**: Implemented using industry-standard technologies (Node.js, Express, MongoDB) ensuring maintainability and scalability.

4. **User-Friendly Interface**: Created an intuitive frontend with search, filter, and pagination capabilities.

5. **Security**: Implemented authentication and authorization to protect sensitive operations.

**Learning Outcomes:**

- Understanding of NoSQL database concepts and document data model
- Practical experience with MongoDB Atlas cloud deployment
- RESTful API design and implementation
- Frontend-backend integration using JavaScript

**Future Enhancements:**

1. Image upload functionality for profile pictures
2. PDF generation for faculty reports
3. Integration with institute's authentication system
4. Mobile application development
5. Advanced analytics and reporting dashboard

---

## 9. References

1. MongoDB Documentation. (2025). *MongoDB Manual*. Retrieved from https://docs.mongodb.com/manual/

2. MongoDB Atlas Documentation. (2025). *Getting Started with Atlas*. Retrieved from https://docs.atlas.mongodb.com/

3. Mongoose Documentation. (2025). *Mongoose v8.x Guide*. Retrieved from https://mongoosejs.com/docs/

4. Express.js Documentation. (2025). *Express.js Getting Started*. Retrieved from https://expressjs.com/

5. Node.js Documentation. (2025). *Node.js API Documentation*. Retrieved from https://nodejs.org/docs/

6. JSON Web Tokens. (2025). *Introduction to JSON Web Tokens*. Retrieved from https://jwt.io/introduction

7. MDN Web Docs. (2025). *JavaScript Reference*. Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript

8. Bootstrap Documentation. (2025). *Getting Started with Bootstrap*. Retrieved from https://getbootstrap.com/docs/

9. OWASP. (2025). *Authentication Cheat Sheet*. Retrieved from https://cheatsheetseries.owasp.org/

10. Chodorow, K. (2013). *MongoDB: The Definitive Guide*. O'Reilly Media.

---

**Prepared By:**  
Department of Information Science and Engineering  
Ramaiah Institute of Technology, Bengaluru

**Date:** December 2025
