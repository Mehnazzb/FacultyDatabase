# MongoDB Atlas Setup Guide

This guide walks you through setting up MongoDB Atlas for the Faculty Database Management System.

## Table of Contents

1. [Create MongoDB Atlas Account](#1-create-mongodb-atlas-account)
2. [Create a Cluster](#2-create-a-cluster)
3. [Configure Database Access](#3-configure-database-access)
4. [Configure Network Access](#4-configure-network-access)
5. [Get Connection String](#5-get-connection-string)
6. [Configure the Application](#6-configure-the-application)

---

## 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Start Free"**
3. Sign up with your email or use Google/GitHub account
4. Verify your email address

## 2. Create a Cluster

1. After signing in, you'll be prompted to create a cluster
2. Select **"Shared"** (Free tier) for this project
3. Choose your preferred cloud provider:
   - **AWS** (Amazon Web Services)
   - **Google Cloud**
   - **Azure**
4. Select a region close to your location (e.g., Mumbai for India)
5. Keep the cluster tier as **M0 Sandbox** (Free)
6. Name your cluster (e.g., `FDMS-Cluster`)
7. Click **"Create Cluster"**

> **Note**: Cluster creation takes 3-5 minutes

## 3. Configure Database Access

Create a database user to connect to your cluster:

1. In the left sidebar, click **"Database Access"** (under Security)
2. Click **"Add New Database User"**
3. Choose authentication method: **Password**
4. Enter username: `fdms_admin` (or your preferred username)
5. Enter a strong password or click **"Autogenerate Secure Password"**
   - **Important**: Save this password securely!
6. Under **"Database User Privileges"**, select:
   - **"Read and write to any database"**
7. Click **"Add User"**

## 4. Configure Network Access

Allow your application to connect to the cluster:

1. In the left sidebar, click **"Network Access"** (under Security)
2. Click **"Add IP Address"**
3. For development, you can click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` to the whitelist
   - **Warning**: For production, specify only your server's IP address
4. Click **"Confirm"**

## 5. Get Connection String

1. In the left sidebar, click **"Database"** (under Deployment)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select driver: **Node.js** and version **4.1 or later**
5. Copy the connection string. It looks like this:
   ```
   mongodb+srv://<username>:<password>@<cluster-name>.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` with your database username (e.g., `fdms_admin`)
7. Replace `<password>` with your database user password
8. Add the database name `fdms` after `.mongodb.net/`:
   ```
   mongodb+srv://fdms_admin:yourpassword@cluster-name.xxxxx.mongodb.net/fdms?retryWrites=true&w=majority
   ```

## 6. Configure the Application

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and update the values:
   ```env
   # MongoDB Atlas Connection String
   MONGODB_URI=mongodb+srv://fdms_admin:yourpassword@cluster-name.xxxxx.mongodb.net/fdms?retryWrites=true&w=majority

   # JWT Secret Key (generate a random string)
   JWT_SECRET=your-super-secret-key-at-least-32-characters

   # Server Port
   PORT=5000

   # Environment
   NODE_ENV=development
   ```

4. Test the connection by starting the server:
   ```bash
   npm start
   ```

   You should see:
   ```
   MongoDB Connected: cluster-name.xxxxx.mongodb.net
   Database: fdms
   ```

---

## Creating the Database and Collection

MongoDB Atlas automatically creates the database and collections when you first insert data. Run the seed script to populate initial data:

```bash
npm run seed
```

This creates:
- Database: `fdms`
- Collections: `faculties`, `users`

---

## Viewing Data in Atlas

1. Go to your cluster in MongoDB Atlas
2. Click **"Browse Collections"**
3. Select the `fdms` database
4. You'll see collections: `faculties`, `users`
5. Click on a collection to view documents

---

## MongoDB Atlas Features

### Collections Created

| Collection | Description |
|------------|-------------|
| `faculties` | Stores all faculty member documents |
| `users` | Stores admin user accounts |

### Indexes

The application automatically creates these indexes for better performance:
- `faculties`: Text index on `name`, `email`, `designation`
- `faculties`: Index on `department`, `designation`, `status`

---

## Troubleshooting

### Connection Refused
- Check your IP address is whitelisted in Network Access
- Verify your username and password are correct
- Ensure the database name is included in the connection string

### Authentication Failed
- Double-check the username and password
- Ensure the user has the correct privileges
- Password should not contain special characters without URL encoding

### Timeout Errors
- Check your internet connection
- Verify the cluster is running (green status in Atlas)
- Try allowing access from anywhere temporarily

---

## Production Considerations

1. **IP Whitelist**: Use specific IP addresses instead of `0.0.0.0/0`
2. **Strong Passwords**: Use complex passwords with at least 16 characters
3. **Backup**: Enable automated backups in Atlas
4. **Monitoring**: Set up alerts for database performance

---

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)

---

**Next Steps**: 
- Follow the [Quickstart Guide](QUICKSTART.md) to set up the complete application
- Read the [API Documentation](API_DOCUMENTATION.md) for API usage
