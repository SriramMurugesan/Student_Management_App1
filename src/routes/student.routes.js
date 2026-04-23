const express = require('express');
const studentController = require('../controllers/student.controller');
const { validateStudentInput } = require('../middlewares/validator');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Apply protection to all routes below this middleware
router.use(protect);

/**
 * Student Routes
 * Mapping HTTP verbs to controller methods
 */

// Route for getting all students and creating a new student
router
  .route('/')
  .get(studentController.getAllStudents)
  .post(validateStudentInput, studentController.createStudent);

// Route for getting, updating, and deleting a specific student by ID
router
  .route('/:id')
  .get(studentController.getStudentById)
  .put(validateStudentInput, studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
