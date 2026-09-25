import React from 'react';
import { Phone, Mail, GraduationCap, UserCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="top-bar">
      <div className="container top-bar-content">
        <div className="top-info">
          <span><Phone size={14} /> +1 (800) 555-UNIV</span>
          <span><Mail size={14} /> info@apexuniversity.edu</span>
        </div>
        <div className="top-links">
          <a href="#portal" onClick={(e) => { e.preventDefault(); alert('Redirecting to Student Portal...'); }}>
            <GraduationCap size={14} /> Student Portal
          </a>
          <a href="#faculty" onClick={(e) => { e.preventDefault(); alert('Redirecting to Faculty Portal...'); }}>
            <UserCheck size={14} /> Faculty & Staff
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
