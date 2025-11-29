import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// Import CAPTCHA Component and Hooks (New)
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // CAPTCHA State and Ref (New)
  const captchaRef = useRef(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0); // Key to force re-render/reload

  // Load CAPTCHA on component mount (New)
  useEffect(() => {
    loadCaptchaEnginge(6); // Load a 6-digit CAPTCHA
  }, []);


  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  
  const handleCaptchaSubmit = () => {
    const userInput = captchaRef.current.value;
    if (validateCaptcha(userInput) === true) {
      setIsCaptchaVerified(true);
      return true;
    } else {
      setIsCaptchaVerified(false);
      setError("CAPTCHA failed. Please try again.");
      loadCaptchaEnginge(6); // Reload CAPTCHA on verification failure
      setCaptchaKey(prev => prev + 1); // Force CAPTCHA UI update
      return false;
    }
  };

  // STRONG VALIDATION (Metric #3) - Now includes CAPTCHA check
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // 6 chars + number

    if (!formData.email || !formData.password) return "All fields required.";
    if (!emailRegex.test(formData.email)) return "Invalid email format.";
    if (!isLogin && !formData.name) return "Name required.";
    if (!isLogin && !passRegex.test(formData.password)) return "Password must be 6+ chars with a number.";
    
    // Check CAPTCHA status before proceeding to network requests (New)
    if (!handleCaptchaSubmit()) return "Please complete the security check.";
    
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
  
  const reloadCaptcha = () => {
    loadCaptchaEnginge(6);
    setCaptchaKey(prev => prev + 1);
    setIsCaptchaVerified(false);
    setError(''); // Clear error if user is manually reloading
    captchaRef.current.value = '';
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
            
            {/* INPUTS */}
            {!isLogin && <div className="input-group"><label>Name</label><input type="text" id="name" onChange={handleChange} /></div>}
            <div className="input-group"><label>Email</label><input type="email" id="email" onChange={handleChange} /></div>
            <div className="input-group"><label>Password</label><input type="password" id="password" onChange={handleChange} /></div>
            
            {/* CAPTCHA INTEGRATION (Metric #11) */}
            <div className="input-group" style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>
                <label>Security Check</label>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    {/* Render the CAPTCHA image/text */}
                    <div key={captchaKey} onClick={reloadCaptcha} style={{cursor: 'pointer', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden'}}>
                        <LoadCanvasTemplate />
                    </div>
                    {/* Input field for CAPTCHA */}
                    <input 
                        type="text" 
                        placeholder="Enter CAPTCHA" 
                        ref={captchaRef} 
                        style={{width: '150px'}} 
                        disabled={isCaptchaVerified && !error} // Disable if verified AND no current error
                    />
                    {/* Verification Status Icon */}
                    {isCaptchaVerified && <i className="fa-solid fa-circle-check" style={{color: 'green', fontSize: '1.5rem'}}></i>}
                </div>
                <small style={{display: 'block', color: 'var(--text-secondary)'}}>Click the code above to refresh.</small>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? '...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
            
          </form>
          <div className="signup-link"><p onClick={() => setIsLogin(!isLogin)} style={{cursor:'pointer', color:'blue'}}>{isLogin ? 'Create Account' : 'Login'}</p></div>
        </div>
      </div>
    </div>
  );
};
export default Login;