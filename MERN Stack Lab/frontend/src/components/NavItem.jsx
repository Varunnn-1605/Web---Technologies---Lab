import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

const NavItem = ({ item, isOpen, onMouseEnter, onMouseLeave, onToggleClick, onCloseMenu }) => {
  const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);

  return (
    <li
      className={`nav-item ${hasDropdown ? 'has-dropdown' : ''} ${isOpen ? 'open' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="nav-item-header">
        <NavLink
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={onCloseMenu}
        >
          {item.label}
        </NavLink>

        {hasDropdown && (
          <button
            type="button"
            className="dropdown-toggle-btn"
            aria-expanded={isOpen}
            aria-label={`Toggle ${item.label} dropdown`}
            onClick={onToggleClick}
          >
            <ChevronDown size={16} className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
          </button>
        )}
      </div>

      {hasDropdown && isOpen && (
        <DropdownMenu items={item.dropdown} onItemClick={onCloseMenu} />
      )}
    </li>
  );
};

export default NavItem;
