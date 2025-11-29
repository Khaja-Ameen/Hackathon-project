import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <i className="fa-solid fa-shield-heart logo-icon"></i>
        <div className="logo-text">
          <span>WellnessHub</span>
          <small>Student Wellness</small>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}><i className="fa-solid fa-table-columns"></i><span>Dashboard</span></NavLink></li>
          <li><NavLink to="/resources" className={({ isActive }) => (isActive ? 'active' : '')}><i className="fa-solid fa-book-open"></i><span>Resources</span></NavLink></li>
          <li><NavLink to="/mood-tracker" className={({ isActive }) => (isActive ? 'active' : '')}><i className="fa-solid fa-face-smile"></i><span>Mood Tracker</span></NavLink></li>
          <li><NavLink to="/sleep-log" className={({ isActive }) => (isActive ? 'active' : '')}><i className="fa-solid fa-bed"></i><span>Sleep Log</span></NavLink></li>
          <li><NavLink to="/activity" className={({ isActive }) => (isActive ? 'active' : '')}><i className="fa-solid fa-person-walking"></i><span>Activity</span></NavLink></li>
          <li><NavLink to="/goals" className={({ isActive }) => (isActive ? 'active' : '')}><i className="fa-solid fa-bullseye"></i><span>Goals</span></NavLink></li>
          <li><NavLink to="/mindfulness" className={({ isActive }) => (isActive ? 'active' : '')}><i className="fa-solid fa-brain"></i><span>Mindfulness</span></NavLink></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <NavLink to="/profile" className="user-profile-link">
          <div className="user-profile">
            <img src="https://api.dicebear.com/8.x/initials/svg?seed=Student" alt="User Avatar" />
            <div className="user-info">
              <span className="user-name">Student</span>
              <span className="user-role">View My Progress</span>
            </div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;