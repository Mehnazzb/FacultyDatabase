require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const facultyRoutes = require('./routes/facultyRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://yourdomain.com'
        : '*',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from frontend folder (in development)
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/faculty', facultyRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Faculty Database Management System API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Root route - serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Handle undefined routes
app.use('*', (req, res) => {
    // If it's an API route, return JSON error
    if (req.originalUrl.startsWith('/api')) {
        return res.status(404).json({
            success: false,
            message: `Route ${req.originalUrl} not found`
        });
    }
    // Otherwise, serve the frontend (for SPA routing)
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
========================================
   Faculty Database Management System
========================================
   Server running on port: ${PORT}
   Environment: ${process.env.NODE_ENV || 'development'}
   API Base URL: http://localhost:${PORT}/api
   Frontend URL: http://localhost:${PORT}
========================================
    `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Rejection:', err.message);
    // Close server & exit process
    // server.close(() => process.exit(1));
});

module.exports = app;
