const Student = require('../models/student.model');

/**
 * Student Service
 * Handles all business logic using Mongoose and MongoDB.
 */

/**
 * Get all students with optional search and pagination
 */
const getAllStudents = async (query) => {
  let { name, page = 1, limit = 10 } = query;
  page = parseInt(page);
  limit = parseInt(limit);

  const filter = {};
  
  // Search by name (Regex search for partial match, case-insensitive)
  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  // 1. Get total count for pagination metadata
  const total = await Student.countDocuments(filter);

  // 2. Execute query with pagination
  // Skip logic: (page - 1) * limit
  const results = await Student.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 }); // Sort by newest first

  return {
    total,
    page,
    limit,
    count: results.length,
    students: results,
  };
};

/**
 * Get a single student by ID
 */
const getStudentById = async (id) => {
  return await Student.findById(id);
};

/**
 * Create a new student
 */
const createStudent = async (data) => {
  return await Student.create(data);
};

/**
 * Update an existing student
 */
const updateStudent = async (id, data) => {
  // { new: true } returns the updated document instead of the old one
  // { runValidators: true } ensures updates adhere to schema rules
  return await Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete a student
 */
const deleteStudent = async (id) => {
  const result = await Student.findByIdAndDelete(id);
  return result !== null;
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
