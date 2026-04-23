/**
 * Real Student Service
 * Connects to the Node.js backend using the Fetch API.
 * Uses environment variables for the API base URL.
 */

const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Helper to get authentication headers
 * @param {boolean} isFormData - If true, skip Content-Type to let browser set boundary
 */
const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
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
  createStudent: async (formData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(true), // true indicates we are sending FormData
      body: formData, // Send FormData directly, do not JSON.stringify
    });
    return await handleResponse(response);
  },

  // UPDATE student
  updateStudent: async (id, formData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(true), // true indicates we are sending FormData
      body: formData, // Send FormData directly, do not JSON.stringify
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
