import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';
import StudentForm from '../components/StudentForm';

const FormPage = () => {
  const { id } = useParams(); // For edit mode
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        setFetching(true);
        try {
          const response = await studentService.getStudentById(id);
          setStudent(response.data);
        } catch (error) {
          alert('Student not found');
          navigate('/dashboard');
        } finally {
          setFetching(false);
        }
      };
      fetchStudent();
    }
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (id) {
        await studentService.updateStudent(id, formData);
      } else {
        await studentService.createStudent(formData);
      }
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to save student details');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
         <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4"></div>
         <p className="text-gray-500">Retrieving student information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {id ? 'Edit Student Profile' : 'Register New Student'}
        </h1>
        <p className="text-gray-500">
          {id ? 'Make changes to existing enrollment data.' : 'Fill in the details to add a new student to the system.'}
        </p>
      </div>
      
      <StudentForm 
        initialData={student} 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/dashboard')}
        isLoading={loading}
      />
    </div>
  );
};

export default FormPage;
