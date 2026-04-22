const AppError = require('../utils/appError');

/**
 * Basic Validation Middleware
 * Checks for common input issues before hitting the database.
 * Detailed field validation is handled by Mongoose Schema.
 */
const validateStudentInput = (req, res, next) => {
  // 1. Check if body exists for POST/PUT
  if ((req.method === 'POST' || req.method === 'PUT') && (!req.body || Object.keys(req.body).length === 0)) {
    return next(new AppError('Request body cannot be empty', 400));
  }

  // 2. Additional pre-DB logic can be added here
  // But we rely on Mongoose for type checking and required fields
  
  next();
};

module.exports = { validateStudentInput };
