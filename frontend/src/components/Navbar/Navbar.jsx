import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

function Navbar() {
  const [isDark, setDark] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-brand-section">
        <Link to="/" className="navbar-brand">
          LY SERAKYUTH
        </Link>
      </div>
      
      <div className="navbar-navigation-links">
        <Link to="/" className="navbar-link">HOME</Link>
        <Link to="/about" className="navbar-link">ABOUT</Link>
        <Link to="/skills" className="navbar-link">SKILLS</Link>
        <Link to="/projects" className="navbar-link">PROJECTS</Link>
      </div>
      
      <div className="navbar-actions">
        <Button onClick={toggleTheme} variant="outline" className="theme-btn">
          {isDark ? (
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </Button>
        
        <Link to="/dashboard" className="profile-nav-link" title="Dashboard">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="profile-icon">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>

        {isAuthenticated && (
          <Button onClick={logout} variant="text" className="logout-nav-btn">
            LOGOUT
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;