import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>My Profile</h1>
          <p>Your wellness journey, statistics, and achievements.</p>
        </div>
        <div className="header-actions">
          <Link to="/settings" className="btn-secondary"><i className="fa-solid fa-user-edit"></i> Edit Profile</Link>
        </div>
      </header>

      <section className="card profile-header">
        <img src="https://api.dicebear.com/8.x/initials/svg?seed=Student&size=96" alt="User Avatar" className="profile-avatar" style={{width: 96, height: 96, borderRadius: '50%', marginRight: '1.5rem'}} />
        <div className="profile-info">
          <h2>Student</h2>
          <p>student@university.edu</p>
          <span>Joined September 2025</span>
        </div>
      </section>
      
      <section className="summary-cards">
        <div className="card">
          <h4>Avg. Mood</h4>
          <div className="value" style={{ color: '#34D399' }}>Good</div>
          <span className="detail">This Month</span>
        </div>
        <div className="card">
          <h4>Sleep Goal</h4>
          <div className="value">92%</div>
          <span className="detail">Met This Week</span>
        </div>
        <div className="card">
          <h4>Activity Streak</h4>
          <div className="value" style={{ color: '#FBBF24' }}>12 Days</div>
          <span className="detail">Personal Best: 20</span>
        </div>
        <div className="card">
          <h4>Goals Met</h4>
          <div className="value">4 / 6</div>
          <span className="detail">This Month</span>
        </div>
      </section>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-trophy"></i> Achievements</h3>
        <p className="section-subtitle">Milestones you've reached on your wellness journey.</p>
        <div className="achievements-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
          <div className="achievement-card" style={{border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem', textAlign: 'center'}}>
            <i className="fa-solid fa-seedling" style={{fontSize: '2rem', color: '#50E3C2', marginBottom: '0.5rem'}}></i>
            <h4>First Week</h4>
            <p style={{fontSize: '0.9rem', color: '#718096'}}>Completed your first week.</p>
          </div>
          <div className="achievement-card" style={{border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem', textAlign: 'center'}}>
            <i className="fa-solid fa-moon" style={{fontSize: '2rem', color: '#4A90E2', marginBottom: '0.5rem'}}></i>
            <h4>Consistent Sleeper</h4>
            <p style={{fontSize: '0.9rem', color: '#718096'}}>Met sleep goal 7 days in a row.</p>
          </div>
          <div className="achievement-card" style={{border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem', textAlign: 'center'}}>
            <i className="fa-solid fa-book-open-reader" style={{fontSize: '2rem', color: '#FBBF24', marginBottom: '0.5rem'}}></i>
            <h4>Mindful Reader</h4>
            <p style={{fontSize: '0.9rem', color: '#718096'}}>Read 3 mindfulness articles.</p>
          </div>
          <div className="achievement-card locked" style={{border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem', textAlign: 'center', opacity: 0.6}}>
            <i className="fa-solid fa-fire" style={{fontSize: '2rem', color: '#E2E8F0', marginBottom: '0.5rem'}}></i>
            <h4>Activity Pro</h4>
            <p style={{fontSize: '0.9rem', color: '#718096'}}>Log 10,000 steps for 5 days.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;