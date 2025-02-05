import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkExperienceForm = () => {
  const navigate = useNavigate();
  const [workEntries, setWorkEntries] = useState([{
    id: 1,
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    responsibilities: '',
    achievements: ''
  }]);

  const [errors, setErrors] = useState({});

  // Load saved data when component mounts
  useEffect(() => {
    const savedWork = localStorage.getItem('workInfo');
    if (savedWork) {
      setWorkEntries(JSON.parse(savedWork));
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    workEntries.forEach((entry, index) => {
      if (!entry.company) {
        newErrors[`company_${index}`] = 'Company name is required';
        isValid = false;
      }
      if (!entry.position) {
        newErrors[`position_${index}`] = 'Position is required';
        isValid = false;
      }
      if (!entry.startDate) {
        newErrors[`startDate_${index}`] = 'Start date is required';
        isValid = false;
      }
      if (!entry.current && !entry.endDate) {
        newErrors[`endDate_${index}`] = 'End date is required if not current position';
        isValid = false;
      }
      if (!entry.current && entry.startDate && entry.endDate && 
          new Date(entry.startDate) > new Date(entry.endDate)) {
        newErrors[`endDate_${index}`] = 'End date must be after start date';
        isValid = false;
      }
      if (!entry.responsibilities) {
        newErrors[`responsibilities_${index}`] = 'Responsibilities are required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (id, field, value) => {
    setWorkEntries(prevEntries =>
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

  const handleCurrentJob = (id, checked) => {
    setWorkEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { 
          ...entry, 
          current: checked,
          endDate: checked ? '' : entry.endDate 
        } : entry
      )
    );
  };

  const addWorkExperience = () => {
    setWorkEntries(prev => [
      ...prev,
      {
        id: prev.length + 1,
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: '',
        achievements: ''
      }
    ]);
  };

  const removeWorkExperience = (id) => {
    if (workEntries.length > 1) {
      setWorkEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('workInfo', JSON.stringify(workEntries));
      navigate('/skills');
    }
  };

  const handlePrevious = () => {
    localStorage.setItem('workInfo', JSON.stringify(workEntries));
    navigate('/education');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Experience</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {workEntries.map((entry, index) => (
          <div key={entry.id} className="p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Position #{index + 1}</h3>
              {workEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWorkExperience(entry.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={entry.company}
                  onChange={(e) => handleChange(entry.id, 'company', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`company_${index}`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`company_${index}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`company_${index}`]}</p>
                )}
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Position Title *
                </label>
                <input
                  type="text"
                  value={entry.position}
                  onChange={(e) => handleChange(entry.id, 'position', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`position_${index}`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`position_${index}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`position_${index}`]}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={entry.location}
                  onChange={(e) => handleChange(entry.id, 'location', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City, State or Remote"
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

              {/* Current Position Checkbox */}
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={entry.current}
                    onChange={(e) => handleCurrentJob(entry.id, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    I currently work here
                  </label>
                </div>
              </div>

              {/* End Date */}
              {!entry.current && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date *
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
              )}

              {/* Key Responsibilities */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Key Responsibilities *
                </label>
                <textarea
                  value={entry.responsibilities}
                  onChange={(e) => handleChange(entry.id, 'responsibilities', e.target.value)}
                  rows={3}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`responsibilities_${index}`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Describe your main responsibilities and duties"
                />
                {errors[`responsibilities_${index}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`responsibilities_${index}`]}</p>
                )}
              </div>

              {/* Key Achievements */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Key Achievements
                </label>
                <textarea
                  value={entry.achievements}
                  onChange={(e) => handleChange(entry.id, 'achievements', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List your key achievements and contributions"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addWorkExperience}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Another Position
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

export default WorkExperienceForm;