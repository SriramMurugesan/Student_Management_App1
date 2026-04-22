/**
 * Mock Student Service
 * This service simulates backend API calls using local storage and timeouts.
 * Structure is ready to be swapped with real fetch/axios calls later.
 */

const STORAGE_KEY = 'mock_students';

const initialStudents = [
  { id: '1', name: 'Sriram Murugesan', age: 24, course: 'Full Stack Development', createdAt: new Date().toISOString() },
  { id: '2', name: 'John Doe', age: 22, course: 'Computer Science', createdAt: new Date().toISOString() },
  { id: '3', name: 'Jane Smith', age: 21, course: 'Mathematics', createdAt: new Date().toISOString() },
];

// Initialize storage if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const studentService = {
  // GET all students
  getAllStudents: async () => {
    await sleep(800); // Simulate network delay
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { status: 'success', data: { students: data, total: data.length } };
  },

  // GET student by ID
  getStudentById: async (id) => {
    await sleep(500);
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const student = data.find(s => s.id === id);
    if (!student) throw new Error('Student not found');
    return { status: 'success', data: student };
  },

  // CREATE student
  createStudent: async (studentData) => {
    await sleep(1000);
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const newStudent = {
      ...studentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedData = [...data, newStudent];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return { status: 'success', data: newStudent };
  },

  // UPDATE student
  updateStudent: async (id, studentData) => {
    await sleep(1000);
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const index = data.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Student not found');
    
    const updatedStudent = { ...data[index], ...studentData };
    data[index] = updatedStudent;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { status: 'success', data: updatedStudent };
  },

  // DELETE student
  deleteStudent: async (id) => {
    await sleep(800);
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const updatedData = data.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return { status: 'success', message: 'Student deleted successfully' };
  }
};
