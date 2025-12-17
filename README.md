# Faculty Database Management System (FDMS)

A comprehensive web-based system for managing faculty information for the Department of Information Science and Engineering at Ramaiah Institute of Technology, Bangalore.

## Overview

The Faculty Database Management System (FDMS) is designed to streamline the management of faculty data, including personal information, educational qualifications, work experience, publications, courses taught, and more. Built with MongoDB as the NoSQL database, Node.js/Express backend, and vanilla HTML/CSS/JavaScript frontend.

## Features

- **Faculty Directory**: Browse and search faculty members with filters
- **Detailed Profiles**: View comprehensive faculty profiles with all information
- **Admin Dashboard**: Statistics overview and faculty management
- **CRUD Operations**: Add, edit, and delete faculty records
- **Authentication**: Secure admin login with JWT-based authentication
- **Search & Filter**: Find faculty by name, designation, or department
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

| Component | Technology |
|-----------|------------|
| Database | MongoDB Atlas (Cloud) |
| Backend | Node.js, Express.js |
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Authentication | JWT (JSON Web Tokens) |
| ODM | Mongoose |

## Project Structure

```
faculty-database-management-system/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── facultyController.js # Faculty CRUD operations
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── Faculty.js         # Faculty schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth API routes
│   │   └── facultyRoutes.js   # Faculty API routes
│   ├── scripts/
│   │   └── seed.js            # Database seeding script
│   ├── .env.example           # Environment variables template
│   ├── package.json           # Node.js dependencies
│   └── server.js              # Express server entry point
├── frontend/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── api.js             # API service module
│   │   ├── auth.js            # Authentication module
│   │   ├── config.js          # App configuration
│   │   ├── dashboard.js       # Dashboard functionality
│   │   ├── faculty-detail.js  # Profile page logic
│   │   ├── faculty-form.js    # Form handling
│   │   └── main.js            # Home page logic
│   ├── dashboard.html         # Admin dashboard
│   ├── faculty-detail.html    # Faculty profile page
│   ├── faculty-form.html      # Add/Edit faculty form
│   ├── index.html             # Home page (Faculty directory)
│   └── login.html             # Admin login page
├── docs/
│   ├── API_DOCUMENTATION.md   # API reference
│   ├── MONGODB_ATLAS_SETUP.md # MongoDB Atlas setup guide
│   ├── PROJECT_REPORT.md      # Project report
│   ├── QUICKSTART.md          # Quick setup guide
│   └── USER_GUIDE.md          # End-user documentation
└── README.md                  # This file
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (free tier available)

### Installation

1. **Clone or download the project**
   ```bash
   cd faculty-database-management-system
   ```

2. **Set up MongoDB Atlas**
   - Follow the detailed guide in `docs/MONGODB_ATLAS_SETUP.md`
   - Get your connection string

3. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fdms
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Seed the database with sample data**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   npm start
   ```

7. **Access the application**
   - Open your browser and navigate to `http://localhost:5000`
   - Admin login: `admin` / `admin123`

## Documentation

| Document | Description |
|----------|-------------|
| [MongoDB Atlas Setup](docs/MONGODB_ATLAS_SETUP.md) | Step-by-step guide to set up MongoDB Atlas |
| [Quickstart Guide](docs/QUICKSTART.md) | Quick setup for developers |
| [User Guide](docs/USER_GUIDE.md) | End-user documentation |
| [API Documentation](docs/API_DOCUMENTATION.md) | Complete API reference |
| [Project Report](docs/PROJECT_REPORT.md) | Academic project report |

## API Endpoints

### Faculty Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/faculty` | Get all faculty | No |
| GET | `/api/faculty/:id` | Get faculty by ID | No |
| POST | `/api/faculty` | Create faculty | Yes (Admin/Editor) |
| PUT | `/api/faculty/:id` | Update faculty | Yes (Admin/Editor) |
| DELETE | `/api/faculty/:id` | Delete faculty | Yes (Admin) |
| GET | `/api/faculty/stats` | Get statistics | No |
| GET | `/api/faculty/search` | Search faculty | No |

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | Register new user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/me` | Update profile |
| PUT | `/api/auth/password` | Change password |

## Default Credentials

After seeding the database:
- **Username**: `admin`
- **Password**: `admin123`

> **Important**: Change the default password before deploying to production!

## Data Model

### Faculty Document Structure

```javascript
{
  employeeId: String,        // Unique employee ID
  name: String,              // Full name
  email: String,             // Email address
  phone: String,             // Phone number
  designation: String,       // Professor, Associate Professor, etc.
  department: String,        // Department name
  dateOfJoining: Date,       // Joining date
  status: String,            // Active, On Leave, Retired
  qualifications: [{         // Educational qualifications
    degree: String,
    specialization: String,
    institution: String,
    yearOfPassing: Number
  }],
  publications: [{           // Research publications
    title: String,
    type: String,            // Journal, Conference, Book
    authors: String,
    venue: String,
    year: Number,
    indexing: String         // SCI, Scopus, etc.
  }],
  researchInterests: [String],
  coursesTaught: [{
    courseName: String,
    courseCode: String,
    semester: Number
  }],
  biography: String,
  // ... additional fields
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Department of Information Science and Engineering
- Ramaiah Institute of Technology, Bangalore
- MongoDB Atlas for cloud database hosting

---

**Developed for the Department of Information Science and Engineering, Ramaiah Institute of Technology**
