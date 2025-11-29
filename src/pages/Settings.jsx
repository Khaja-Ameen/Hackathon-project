import React, { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Settings</h1>
          <p>Manage your account preferences and app settings.</p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-bell"></i> Notifications</h3>
          <div className="setting-item">
            <div>
              <h4>Daily Reminders</h4>
              <p>Receive a notification to log your mood and sleep.</p>
            </div>
            <div className={`toggle-switch ${notifications ? 'active' : ''}`} onClick={() => setNotifications(!notifications)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="setting-item">
            <div>
              <h4>Weekly Report</h4>
              <p>Get a summary of your wellness stats every Sunday.</p>
            </div>
            <div className="toggle-switch active">
               <div className="toggle-knob"></div>
            </div>
          </div>
        </section>

        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-paintbrush"></i> Appearance</h3>
          <div className="setting-item">
            <div>
              <h4>Dark Mode</h4>
              <p>Switch between light and dark themes.</p>
            </div>
             <div className={`toggle-switch ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(!darkMode)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
        </section>

        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-user-gear"></i> Account Settings</h3>
          <form className="settings-form">
            <div className="input-group">
                <label>Display Name</label>
                <input type="text" defaultValue="Student" />
            </div>
            <div className="input-group">
                <label>Email Address</label>
                <input type="email" defaultValue="student@university.edu" />
            </div>
            <button className="btn-primary">Save Changes</button>
          </form>
        </section>

        <section className="card">
             <h3 className="section-title"><i className="fa-solid fa-triangle-exclamation"></i> Danger Zone</h3>
             <div className="account-actions">
                 <button className="btn-danger">Log Out</button>
                 <button className="btn-danger">Delete Account</button>
             </div>
        </section>
      </div>
    </>
  );
};

export default Settings;