import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EducationForm = () => {
  const navigate = useNavigate();
  const [educationEntries, setEducationEntries] = useState([{
    id: 1,
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    achievements: ''
  }]);

  const [errors, setErrors] = useState({});

  // Load saved data when component mounts
  useEffect(() => {
    const savedEducation = localStorage.getItem('educationInfo');
    if (savedEducation) {
      setEducationEntries(JSON.parse(savedEducation));
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    educationEntries.forEach((entry, index) => {
      if (!entry.school) {
        newErrors[`school_${index}`] = 'School name is required';
        isValid = false;
      }
      if (!entry.degree) {
        newErrors[`degree_${index}`] = 'Degree is required';
        isValid = false;
      }
      if (!entry.startDate) {
        newErrors[`startDate_${index}`] = 'Start date is required';
        isValid = false;
      }
      if (!entry.endDate) {
        newErrors[`endDate_${index}`] = 'End date is required';
        isValid = false;
      }
      if (entry.startDate && entry.endDate && new Date(entry.startDate) > new Date(entry.endDate)) {
        newErrors[`endDate_${index}`] = 'End date must be after start date';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (id, field, value) => {
    setEducationEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
    // Clear error when user starts typing
    if (errors[`${field}_${id-1}`]) {
      setErrors(prev => ({
        ...prev,
        [`${field}_${id-1}`]: ''
      }));
    }
  };

  const addEducation = () => {
    setEducationEntries(prev => [
      ...prev,
      {
        id: prev.length + 1,
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        achievements: ''
      }
    ]);
  };

  const removeEducation = (id) => {
    if (educationEntries.length > 1) {
      setEducationEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('educationInfo', JSON.stringify(educationEntries));
      navigate('/experience');
    }
  };

  const handlePrevious = () => {
    localStorage.setItem('educationInfo', JSON.stringify(educationEntries));
    navigate('/personal');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {educationEntries.map((entry, index) => (
          <div key={entry.id} className="p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Education #{index + 1}</h3>
              {educationEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(entry.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* School Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  School/University *
                </label>
                <input
                  type="text"
                  value={entry.school}
                  onChange={(e) => handleChange(entry.id, 'school', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`school_${index}`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`school_${index}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`school_${index}`]}</p>
                )}
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Degree *
                </label>
                <input
                  type="text"
                  value={entry.degree}
                  onChange={(e) => handleChange(entry.id, 'degree', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`degree_${index}`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`degree_${index}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`degree_${index}`]}</p>
                )}
              </div>

              {/* Field of Study */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={entry.field}
                  onChange={(e) => handleChange(entry.id, 'field', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* GPA */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GPA
                </label>
                <input
                  type="text"
                  value={entry.gpa}
                  onChange={(e) => handleChange(entry.id, 'gpa', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date *
                </label>
                <input
                  type="month"
                  value={entry.startDate}
                  onChange={(e) => handleChange(entry.id, 'startDate', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`startDate_${index}`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`startDate_${index}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`startDate_${index}`]}</p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date (or Expected) *
                </label>
                <input
                  type="month"
                  value={entry.endDate}
                  onChange={(e) => handleChange(entry.id, 'endDate', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`endDate_${index}`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`endDate_${index}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`endDate_${index}`]}</p>
                )}
              </div>

              {/* Achievements */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Achievements/Activities
                </label>
                <textarea
                  value={entry.achievements}
                  onChange={(e) => handleChange(entry.id, 'achievements', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List notable achievements, academic honors, or relevant activities"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Another Education
          </button>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handlePrevious}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Previous
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;