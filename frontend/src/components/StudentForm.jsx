import React, { useState, useEffect } from 'react';
import { User, BookOpen, Hash, Save, X, Camera, Loader2 } from 'lucide-react';
import Button from './Button';

/**
 * Reusable Form for Student data entry.
 * Handles internal state and validation.
 */
const StudentForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        age: initialData.age || '',
        course: initialData.course || ''
      });
      if (initialData.profileImage) {
        setImagePreview(initialData.profileImage);
      }
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || formData.age <= 0) newErrors.age = 'Enter a valid age';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || '' : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('age', formData.age);
      data.append('course', formData.course);
      if (image) {
        data.append('image', image);
      }
      onSubmit(data);
    }
  };

  const inputStyles = "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 transition-all outline-none";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md relative">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <User size={64} />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-primary-600 p-2.5 rounded-full text-white cursor-pointer shadow-lg hover:bg-primary-700 transition-colors group-hover:scale-110">
              <Camera size={20} />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
                disabled={isLoading}
              />
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-3">Upload student profile photo (JPG, PNG)</p>
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sriram Murugesan"
              className={`${inputStyles} ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
              disabled={isLoading}
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Age Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
          <div className="relative">
            <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 24"
              className={`${inputStyles} ${errors.age ? 'border-red-500' : 'border-gray-200'}`}
              disabled={isLoading}
            />
          </div>
          {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
        </div>

        {/* Course Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. MERN Stack Integration"
              className={`${inputStyles} ${errors.course ? 'border-red-500' : 'border-gray-200'}`}
              disabled={isLoading}
            />
          </div>
          {errors.course && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
          <Button 
            type="submit" 
            className="flex-1 space-x-2" 
            disabled={isLoading}
          >
            <Save className="w-5 h-5" />
            <span>{isLoading ? 'Saving...' : 'Save Student Details'}</span>
          </Button>
          <Button 
            variant="secondary" 
            onClick={onCancel} 
            className="space-x-2"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default StudentForm;
