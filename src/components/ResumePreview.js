import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillsForm = () => {
  const navigate = useNavigate();
  const [skillCategories, setSkillCategories] = useState([
    {
      id: 1,
      name: 'Technical Skills',
      skills: [{ id: 1, name: '', proficiency: 'Intermediate' }]
    }
  ]);

  const [errors, setErrors] = useState({});

  const proficiencyLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  // Load saved data when component mounts
  useEffect(() => {
    const savedSkills = localStorage.getItem('skillsInfo');
    if (savedSkills) {
      setSkillCategories(JSON.parse(savedSkills));
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    skillCategories.forEach((category, categoryIndex) => {
      if (!category.name.trim()) {
        newErrors[`category_${categoryIndex}`] = 'Category name is required';
        isValid = false;
      }

      category.skills.forEach((skill, skillIndex) => {
        if (!skill.name.trim()) {
          newErrors[`skill_${categoryIndex}_${skillIndex}`] = 'Skill name is required';
          isValid = false;
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleCategoryNameChange = (categoryId, newName) => {
    setSkillCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? { ...category, name: newName }
          : category
      )
    );
    // Clear category error
    const categoryIndex = skillCategories.findIndex(cat => cat.id === categoryId);
    if (errors[`category_${categoryIndex}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`category_${categoryIndex}`];
        return newErrors;
      });
    }
  };

  const handleSkillChange = (categoryId, skillId, field, value) => {
    setSkillCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? {
              ...category,
              skills: category.skills.map(skill =>
                skill.id === skillId
                  ? { ...skill, [field]: value }
                  : skill
              )
            }
          : category
      )
    );
    // Clear skill error
    const categoryIndex = skillCategories.findIndex(cat => cat.id === categoryId);
    const skillIndex = skillCategories[categoryIndex].skills.findIndex(skill => skill.id === skillId);
    if (errors[`skill_${categoryIndex}_${skillIndex}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`skill_${categoryIndex}_${skillIndex}`];
        return newErrors;
      });
    }
  };

  const addSkill = (categoryId) => {
    setSkillCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? {
              ...category,
              skills: [
                ...category.skills,
                {
                  id: Math.max(0, ...category.skills.map(s => s.id)) + 1,
                  name: '',
                  proficiency: 'Intermediate'
                }
              ]
            }
          : category
      )
    );
  };

  const removeSkill = (categoryId, skillId) => {
    setSkillCategories(prev =>
      prev.map(category =>
        category.id === categoryId && category.skills.length > 1
          ? {
              ...category,
              skills: category.skills.filter(skill => skill.id !== skillId)
            }
          : category
      )
    );
  };

  const addCategory = () => {
    setSkillCategories(prev => [
      ...prev,
      {
        id: Math.max(0, ...prev.map(c => c.id)) + 1,
        name: '',
        skills: [{ id: 1, name: '', proficiency: 'Intermediate' }]
      }
    ]);
  };

  const removeCategory = (categoryId) => {
    if (skillCategories.length > 1) {
      setSkillCategories(prev =>
        prev.filter(category => category.id !== categoryId)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('skillsInfo', JSON.stringify(skillCategories));
      // Navigate to next section or preview
      // For now, we'll just console.log the data
      console.log('Skills saved:', skillCategories);
    }
  };

  const handlePrevious = () => {
    localStorage.setItem('skillsInfo', JSON.stringify(skillCategories));
    navigate('/experience');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.id} className="p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => handleCategoryNameChange(category.id, e.target.value)}
                  className={`text-lg font-medium bg-transparent border-b border-gray-300 focus:border-blue-500 focus:ring-0 w-full ${
                    errors[`category_${categoryIndex}`] ? 'border-red-300' : ''
                  }`}
                  placeholder="Category Name *"
                />
                {errors[`category_${categoryIndex}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`category_${categoryIndex}`]}</p>
                )}
              </div>
              {skillCategories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCategory(category.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove Category
                </button>
              )}
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        handleSkillChange(category.id, skill.id, 'name', e.target.value)
                      }
                      className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`skill_${categoryIndex}_${skillIndex}`] ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Skill name *"
                    />
                    {errors[`skill_${categoryIndex}_${skillIndex}`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`skill_${categoryIndex}_${skillIndex}`]}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={skill.proficiency}
                      onChange={(e) =>
                        handleSkillChange(category.id, skill.id, 'proficiency', e.target.value)
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      {proficiencyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>

                    {category.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(category.id, skill.id)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addSkill(category.id)}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Skill
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addCategory}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Category
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
            Save & Preview Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillsForm;