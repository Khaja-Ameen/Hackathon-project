import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { mockApi } from '../utils/mockApi';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [isLogin, setIsLogin] = useState(true); // Toggle Login/Register
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(''); // Clear error when typing
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) return "All fields are required.";
    if (!isLogin && !formData.name) return "Name is required.";
    if (formData.password.length < 6) return "Password must be at least 6 chars.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      let user;
      if (isLogin) {
        user = await mockApi.login(formData.email, formData.password);
      } else {
        user = await mockApi.register(formData.name, formData.email, formData.password);
      }
      login(user); // Update context
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
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
          <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p>{isLogin ? 'Please enter your details to continue.' : 'Start your wellness journey today.'}</p>
          
          {error && <div style={{color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#fee2e2', borderRadius: '5px'}}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>
            )}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
            </div>
            
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="signup-link">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setError(''); }}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;