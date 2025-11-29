import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  // STRONG VALIDATION (Metric #3)
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // 6 chars + number

    if (!formData.email || !formData.password) return "All fields required.";
    if (!emailRegex.test(formData.email)) return "Invalid email format.";
    if (!isLogin && !formData.name) return "Name required.";
    if (!isLogin && !passRegex.test(formData.password)) return "Password must be 6+ chars with a number.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) { setError(err); return; }

    setIsLoading(true);
    try {
      if (isLogin) await login(formData.email, formData.password);
      else await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError("Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-panel-left">
        <div className="brand-content"><i className="fa-solid fa-shield-heart"></i><h1>Welcome to WellnessHub</h1><p>Your personal space to track well-being.</p></div>
      </div>
      <div className="login-panel-right">
        <div className="login-form-wrapper">
          <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          <form onSubmit={handleSubmit}>
            {!isLogin && <div className="input-group"><label>Name</label><input type="text" id="name" onChange={handleChange} /></div>}
            <div className="input-group"><label>Email</label><input type="email" id="email" onChange={handleChange} /></div>
            <div className="input-group"><label>Password</label><input type="password" id="password" onChange={handleChange} /></div>
            <button type="submit" className="btn-primary" disabled={isLoading}>{isLoading ? '...' : (isLogin ? 'Sign In' : 'Sign Up')}</button>
          </form>
          <div className="signup-link"><p onClick={() => setIsLogin(!isLogin)} style={{cursor:'pointer', color:'blue'}}>{isLogin ? 'Create Account' : 'Login'}</p></div>
        </div>
      </div>
    </div>
  );
};
export default Login;