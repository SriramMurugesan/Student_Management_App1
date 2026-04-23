const mongoose = require('mongoose');

/**
 * Student Schema
 * Defines the structure and validation rules for students in MongoDB.
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A student must have a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    age: {
      type: Number,
      required: [true, 'A student must have an age'],
      min: [1, 'Age must be at least 1'],
    },
    course: {
      type: String,
      required: [true, 'A student must have a course'],
      trim: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    cloudinaryId: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Ensure virtuals are included when converting to JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create the Model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
