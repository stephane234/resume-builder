import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 p-4 sticky top-0">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
        <Link
          to="/"
          className={`px-4 py-2 text-white rounded hover:bg-blue-700 ${isActive('/')}`}
        >
          Login
        </Link>
        <Link
          to="/preview"
          className={`px-4 py-2 text-white rounded hover:bg-blue-700 ${isActive('/preview')}`}
>
          Preview
        </Link>
        <Link
          to="/personal"
          className={`px-4 py-2 text-white rounded hover:bg-blue-700 ${isActive('/personal')}`}
        >
          Personal Info
        </Link>
        <Link
          to="/education"
          className={`px-4 py-2 text-white rounded hover:bg-blue-700 ${isActive('/education')}`}
        >
          Education
        </Link>
        <Link
          to="/experience"
          className={`px-4 py-2 text-white rounded hover:bg-blue-700 ${isActive('/experience')}`}
        >
          Work Experience
        </Link>
        <Link
          to="/skills"
          className={`px-4 py-2 text-white rounded hover:bg-blue-700 ${isActive('/skills')}`}
        >
          Skills
        </Link>

        
      </div>
    </nav>
  );
};

export default Navbar;