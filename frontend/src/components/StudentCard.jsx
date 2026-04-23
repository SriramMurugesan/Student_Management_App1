import React from 'react';
import { Edit, Trash2, BookOpen, Calendar, User } from 'lucide-react';
import Button from './Button';

/**
 * Reusable Card for Student Display
 */
const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-50 flex-shrink-0">
          {student.profileImage ? (
            <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-primary-50 flex items-center justify-center">
              <User className="text-primary-600 w-6 h-6" />
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => onEdit(student.id)}
            className="text-gray-600 hover:text-primary-600"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => onDelete(student.id)}
            className="text-gray-600 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
      <p className="text-gray-500 text-sm mb-4">ID: {student.id}</p>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600 text-sm">
          <BookOpen className="w-4 h-4 mr-2" />
          <span>{student.course}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Age: {student.age} Years</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
        <span>Joined {new Date(student.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default StudentCard;
