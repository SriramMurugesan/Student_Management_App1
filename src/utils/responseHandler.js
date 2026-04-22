/**
 * Standardizes the API responses.
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success/Error message
 * @param {Object} data - Payload to return (optional)
 */
const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    status: statusCode < 400 ? 'success' : 'error',
    message,
    data,
  });
};

module.exports = { sendResponse };
