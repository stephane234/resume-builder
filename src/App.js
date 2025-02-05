import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import PersonalInfoForm from './components/PersonalInfoForm';
import EducationForm from './components/EducationForm';
import WorkExperienceForm from './components/WorkExperienceForm';
import SkillsForm from './components/SkillsForm';
import ResumePreview from './components/ResumePreview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/personal" element={<PersonalInfoForm />} />
            <Route path="/education" element={<EducationForm />} />
            <Route path="/experience" element={<WorkExperienceForm />} />
            <Route path="/skills" element={<SkillsForm />} />
            <Route path="/preview" element={<ResumePreview />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;