import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, RefreshCw, GraduationCap } from 'lucide-react';
import { studentService } from '../services/studentService';
import StudentCard from '../components/StudentCard';
import Button from '../components/Button';

const DashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentService.getAllStudents();
      setStudents(response.data.students);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        setStudents(prev => prev.filter(s => s.id !== id));
      } catch (error) {
        alert('Failed to delete student');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Directory</h1>
          <p className="text-gray-500 mt-1">Manage and track your active student enrollments.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={fetchStudents} className="p-2.5">
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            onClick={() => navigate('/add')} 
            className="space-x-2 shadow-lg shadow-primary-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Student</span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search by name or course..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading student data...</p>
        </div>
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <StudentCard 
              key={student.id} 
              student={student} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-sm">
            <GraduationCap className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            {searchTerm 
              ? `No results match your search for "${searchTerm}"` 
              : "It looks like your student directory is empty."}
          </p>
          <Button variant="secondary" onClick={() => navigate('/add')}>
            Start by adding one
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
