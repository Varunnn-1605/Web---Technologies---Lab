import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Landmark } from 'lucide-react';
import NavItem from './NavItem';
import { navData } from '../navData';

const Navbar = () => {
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = (id) => {
    if (window.innerWidth >= 768) setActiveDropdownId(id);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) setActiveDropdownId(null);
  };

  const handleToggleDropdown = (id) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleCloseAll = () => {
    setActiveDropdownId(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="main-navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={handleCloseAll}>
          <div className="logo-icon">
            <Landmark size={28} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Apex University</span>
            <span className="brand-tagline">Excellence in Innovation & Learning</span>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="mobile-hamburger"
          onClick={handleToggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          {navData.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isOpen={activeDropdownId === item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              onToggleClick={() => handleToggleDropdown(item.id)}
              onCloseMenu={handleCloseAll}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
