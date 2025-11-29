import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page-container">
      <div className="login-panel-left">
        <div className="brand-content">
          <i className="fa-solid fa-shield-heart"></i>
          <h1>Welcome to WellnessHub</h1>
          <p>Your personal space to track, manage, and improve your well-being.</p>
        </div>
      </div>
      <div className="login-panel-right">
        <div className="login-form-wrapper">
          <h2>Sign In</h2>
          <p>Please enter your details to continue.</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required placeholder="you@example.com" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required placeholder="••••••••" />
            </div>
            <div className="form-options">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn-primary">Sign In</button>
          </form>
          <div className="signup-link">
            <p>Don't have an account? <a href="#">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;