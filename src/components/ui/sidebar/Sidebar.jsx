import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/categories" className={({ isActive }) => (isActive ? "active-link" : "")}>
          📂 Categories
        </NavLink>
        <NavLink to="/brands" className={({ isActive }) => (isActive ? "active-link" : "")}>
          🏷️ Brands
        </NavLink>
        <NavLink to="/cities" className={({ isActive }) => (isActive ? "active-link" : "")}>
          🌆 Cities
        </NavLink>
        <NavLink to="/locations" className={({ isActive }) => (isActive ? "active-link" : "")}>
          📍 Locations
        </NavLink>
        <NavLink to="/cars" className={({ isActive }) => (isActive ? "active-link" : "")}>
          🚗 Cars
        </NavLink>
        <NavLink to="/models" className={({ isActive }) => (isActive ? "active-link" : "")}>
          🔧 Models
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
