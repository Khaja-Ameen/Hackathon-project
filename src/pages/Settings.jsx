import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Settings</h1>
          <p>Manage your account preferences.</p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="card">
          <h3 className="section-title">Account</h3>
          <div className="setting-item">
            <div><h4>Name</h4><p>{user?.name}</p></div>
          </div>
          <div className="setting-item">
            <div><h4>Email</h4><p>{user?.email}</p></div>
          </div>
        </section>

        <section className="card">
             <h3 className="section-title" style={{color: '#F87171'}}>Danger Zone</h3>
             <div className="account-actions">
                 <button className="btn-danger" onClick={logout}>Log Out</button>
             </div>
        </section>
      </div>
    </>
  );
};

export default Settings;