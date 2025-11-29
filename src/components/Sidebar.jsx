import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <i className="fa-solid fa-shield-heart logo-icon"></i>
        <div className="logo-text"><span>WellnessHub</span><small>Student Wellness</small></div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/dashboard"><i className="fa-solid fa-table-columns"></i><span>Dashboard</span></NavLink></li>
          <li><NavLink to="/resources"><i className="fa-solid fa-book-open"></i><span>Resources</span></NavLink></li>
          <li><NavLink to="/mood-tracker"><i className="fa-solid fa-face-smile"></i><span>Mood Tracker</span></NavLink></li>
          <li><NavLink to="/sleep-log"><i className="fa-solid fa-bed"></i><span>Sleep Log</span></NavLink></li>
          <li><NavLink to="/activity"><i className="fa-solid fa-person-walking"></i><span>Activity</span></NavLink></li>
          <li><NavLink to="/goals"><i className="fa-solid fa-bullseye"></i><span>Goals</span></NavLink></li>
          <li><NavLink to="/mindfulness"><i className="fa-solid fa-brain"></i><span>Mindfulness</span></NavLink></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <NavLink to="/profile" className="user-profile-link">
          <div className="user-profile">
            <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${user ? user.name : 'User'}`} alt="Avatar" />
            <div className="user-info">
              <span className="user-name">{user ? user.name : 'Guest'}</span>
              <span className="user-role">View Progress</span>
            </div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
export default Sidebar;