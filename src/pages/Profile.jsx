import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <header className="main-header">
        <div className="header-title"><h1>My Profile</h1></div>
        <div className="header-actions"><Link to="/settings" className="btn-secondary">Edit Profile</Link></div>
      </header>

      <section className="card profile-header">
        <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${user ? user.name : 'User'}&size=96`} className="profile-avatar" style={{width: 96, height: 96, borderRadius: '50%'}} />
        <div className="profile-info">
          <h2>{user ? user.name : 'Student'}</h2>
          <p>{user ? user.email : 'student@university.edu'}</p>
          <span>Wellness Member</span>
        </div>
      </section>
      
      {/* Rest of static content remains the same for summary cards and achievements */}

      <section className="summary-cards">
        <div className="card"><h4>Avg. Mood</h4><div className="value" style={{ color: '#34D399' }}>Good</div><span className="detail">This Month</span></div>
        <div className="card"><h4>Sleep Goal</h4><div className="value">92%</div><span className="detail">Met This Week</span></div>
        <div className="card"><h4>Activity Streak</h4><div className="value" style={{ color: '#FBBF24' }}>12 Days</div><span className="detail">Personal Best: 20</span></div>
        <div className="card"><h4>Goals Met</h4><div className="value">4 / 6</div><span className="detail">This Month</span></div>
      </section>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-trophy"></i> Achievements</h3>
        {/* Achievements UI remains static for now */}
      </section>
    </>
  );
};
export default Profile;