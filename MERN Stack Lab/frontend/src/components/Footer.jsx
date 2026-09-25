import React from 'react';
import { Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Landmark size={24} />
            <span>Apex University</span>
          </div>
          <p>Inspiring global leaders, pioneering groundbreaking research, and enriching communities worldwide.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/research">Research</Link></li>
            <li><Link to="/notices">Notices</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Main Campus</h4>
          <p>128 University Boulevard</p>
          <p>Academic City, AC 90210</p>
          <p>Email: admissions@apexuniversity.edu</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Apex University. Built with React, Node.js & MongoDB.</p>
      </div>
    </footer>
  );
};

export default Footer;
