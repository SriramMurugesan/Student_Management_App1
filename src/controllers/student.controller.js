const studentService = require('../services/student.service');
const { sendResponse } = require('../utils/responseHandler');
const AppError = require('../utils/appError');
const { getIO } = require('../utils/socket');

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
    const studentData = { ...req.body };
    
    // Add image info if uploaded
    if (req.file) {
      studentData.profileImage = req.file.path;
      studentData.cloudinaryId = req.file.filename;
    }

    const newStudent = await studentService.createStudent(studentData);
    
    // Real-time notification
    getIO().emit('student:created', newStudent);

    sendResponse(res, 201, 'Student created successfully', newStudent);
  } catch (error) {
    next(error);
  }
};

// Update student
const updateStudent = async (req, res, next) => {
  try {
    const studentData = { ...req.body };
    
    // Add image info if uploaded
    if (req.file) {
      const existingStudent = await studentService.getStudentById(req.params.id);
      if (existingStudent && existingStudent.cloudinaryId) {
        const cloudinary = require('../config/cloudinary');
        await cloudinary.uploader.destroy(existingStudent.cloudinaryId);
      }
      studentData.profileImage = req.file.path;
      studentData.cloudinaryId = req.file.filename;
    }

    const updatedStudent = await studentService.updateStudent(req.params.id, studentData);
    if (!updatedStudent) {
      return next(new AppError('Student not found', 404));
    }

    // Real-time notification
    getIO().emit('student:updated', updatedStudent);

    sendResponse(res, 200, 'Student updated successfully', updatedStudent);
  } catch (error) {
    next(error);
  }
};

// Delete student
const deleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return next(new AppError('Student not found', 404));
    }

    // Delete image from Cloudinary if it exists
    if (student.cloudinaryId) {
      const cloudinary = require('../config/cloudinary');
      await cloudinary.uploader.destroy(student.cloudinaryId);
    }

    const success = await studentService.deleteStudent(req.params.id);
    if (!success) {
      return next(new AppError('Student not found', 404));
    }

    // Real-time notification
    getIO().emit('student:deleted', req.params.id);

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
