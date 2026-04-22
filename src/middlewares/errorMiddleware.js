const { sendResponse } = require('../utils/responseHandler');

/**
 * Global Error Handling Middleware
 * Catch and format both operational and generic errors.
 */
const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // 1. Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    error.message = `Invalid ${err.path}: ${err.value}. Please provide a valid ID.`;
    error.statusCode = 400;
  }

  // 2. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((el) => el.message);
    error.message = `Invalid input data: ${messages.join('. ')}`;
    error.statusCode = 400;
  }

  // 3. Mongoose Duplicate Key Error (MongoServerError code 11000)
  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    error.message = `Duplicate field value: ${value}. Please use another value!`;
    error.statusCode = 400;
  }

  // Fallback for unexpected errors
  sendResponse(res, error.statusCode, error.message);
};

/**
 * 404 (Not Found) Middleware
 */
const notFoundHandler = (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  next(err);
};

module.exports = {
  globalErrorHandler,
  notFoundHandler,
};
