import React from 'react';
import { NavLink } from 'react-router-dom';

const DropdownMenu = ({ items, onItemClick }) => {
  return (
    <ul className="dropdown-menu" role="menu">
      {items.map((subItem) => (
        <li key={subItem.path} className="dropdown-item">
          <NavLink
            to={subItem.path}
            className={({ isActive }) => (isActive ? 'dropdown-link active' : 'dropdown-link')}
            onClick={onItemClick}
          >
            <div className="dropdown-link-title">{subItem.label}</div>
            {subItem.desc && <div className="dropdown-link-desc">{subItem.desc}</div>}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
