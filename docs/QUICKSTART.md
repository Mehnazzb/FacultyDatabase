# Quickstart Guide

Get the Faculty Database Management System running in under 10 minutes.

## Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MongoDB Atlas** account ([Sign up free](https://www.mongodb.com/cloud/atlas))

## Step 1: Set Up MongoDB Atlas

1. Create a free MongoDB Atlas account
2. Create a new cluster (Free tier - M0)
3. Create a database user (remember username/password)
4. Whitelist your IP address (or allow from anywhere for development)
5. Get your connection string

> For detailed instructions, see [MongoDB Atlas Setup Guide](MONGODB_ATLAS_SETUP.md)

## Step 2: Configure Backend

```bash
# Navigate to backend folder
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fdms
```

## Step 3: Install Dependencies

```bash
# In backend folder
npm install
```

## Step 4: Seed Database

```bash
npm run seed
```

This creates:
- 10 sample faculty members
- 1 admin user (`admin` / `admin123`)

## Step 5: Start Server

```bash
npm start
```

Server runs at: `http://localhost:5000`

## Step 6: Access Application

| Page | URL |
|------|-----|
| Home (Faculty Directory) | http://localhost:5000 |
| Admin Login | http://localhost:5000/login.html |
| Admin Dashboard | http://localhost:5000/dashboard.html |

## Default Admin Credentials

| Username | Password |
|----------|----------|
| admin | admin123 |

---

## Quick API Test

```bash
# Get all faculty
curl http://localhost:5000/api/faculty

# Get statistics
curl http://localhost:5000/api/faculty/stats

# Login (get token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## Folder Structure Overview

```
faculty-database-management-system/
├── backend/          # Node.js/Express API server
│   ├── config/       # Database configuration
│   ├── controllers/  # Business logic
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   └── server.js     # Entry point
├── frontend/         # HTML/CSS/JS client
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript modules
│   └── *.html        # HTML pages
└── docs/             # Documentation
```

---

## Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check connection string and IP whitelist |
| Port already in use | Change PORT in .env file |
| Cannot find module | Run `npm install` again |

---

## Next Steps

1. Read the [User Guide](USER_GUIDE.md) to learn how to use the system
2. Check the [API Documentation](API_DOCUMENTATION.md) for integration
3. Customize the design and add more features

---

**Need more help?** See the detailed [MongoDB Atlas Setup Guide](MONGODB_ATLAS_SETUP.md)
