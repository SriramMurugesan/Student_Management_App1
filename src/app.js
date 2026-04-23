require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const { globalErrorHandler, notFoundHandler } = require('./middlewares/errorMiddleware');
const studentRoutes = require('./routes/student.routes');

const app = express();

/**
 * Express Middleware Setup
 */

// 1. Body Parser (to handle JSON data in requests)
app.use(express.json());

// 2. CORS (to allow cross-origin requests)
app.use(cors({
  origin: '*', // Allow all origins for this demo environment
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Custom Logger Middleware
app.use(logger);

// 3. Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is healthy' });
});

// 4. Student Routes
app.use('/api/students', studentRoutes);

// 5. 404 handler (must be after all routes)
app.use(notFoundHandler);

// 6. Global Global Error Handler (must be the last middleware)
app.use(globalErrorHandler);

module.exports = app;
