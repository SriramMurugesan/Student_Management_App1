/**
 * Real Student Service
 * Connects to the Node.js backend using the Fetch API.
 * Uses environment variables for the API base URL.
 */

const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Helper to get authentication headers
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

/**
 * Helper to handle fetch responses and parse errors
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Collect error messages from backend validation or general errors
    const errorMsg = data.message || 'Something went wrong';
    throw new Error(errorMsg);
  }
  
  return data;
};

export const studentService = {
  // GET all students
  getAllStudents: async (query = {}) => {
    // Construct query parameters if any (name, page, limit)
    const params = new URLSearchParams(query).toString();
    const url = params ? `${API_URL}?${params}` : API_URL;
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    return await handleResponse(response);
  },

  // GET student by ID
  getStudentById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(response);
  },

  // CREATE student
  createStudent: async (studentData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });
    return await handleResponse(response);
  },

  // UPDATE student
  updateStudent: async (id, studentData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });
    return await handleResponse(response);
  },

  // DELETE student
  deleteStudent: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await handleResponse(response);
  }
};
