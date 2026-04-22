const studentService = require('../services/student.service');
const { sendResponse } = require('../utils/responseHandler');
const AppError = require('../utils/appError');

/**
 * Controller for Student Operations
 */

// Get all students
const getAllStudents = async (req, res, next) => {
  try {
    const data = await studentService.getAllStudents(req.query);
    sendResponse(res, 200, 'Students retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

// Get student by ID
const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return next(new AppError('Student not found', 404));
    }
    sendResponse(res, 200, 'Student retrieved successfully', student);
  } catch (error) {
    next(error);
  }
};

// Create student
const createStudent = async (req, res, next) => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    sendResponse(res, 201, 'Student created successfully', newStudent);
  } catch (error) {
    next(error);
  }
};

// Update student
const updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    if (!updatedStudent) {
      return next(new AppError('Student not found', 404));
    }
    sendResponse(res, 200, 'Student updated successfully', updatedStudent);
  } catch (error) {
    next(error);
  }
};

// Delete student
const deleteStudent = async (req, res, next) => {
  try {
    const success = await studentService.deleteStudent(req.params.id);
    if (!success) {
      return next(new AppError('Student not found', 404));
    }
    sendResponse(res, 200, 'Student deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
