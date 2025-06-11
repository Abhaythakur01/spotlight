import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import SpotlightLogo from '../assets/spotlight-v1.png';
import './AuthSection.css'; // We will create this file next

const AuthSection = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login, signup, authLoading } = useAuth();
  const navigate = useNavigate();

  // State for both forms
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetFormState = () => {
    setError('');
    setSuccess('');
    setFullName('');
    setEmail('');
    setPassword('');
  };

  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
    resetFormState();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password) {
      return setError('Please enter both email and password.');
    }
    try {
      const result = await login(email, password);
      if (result.success) {
        setSuccess('Logged in successfully! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!fullName || !email || !password) {
      return setError('Please fill in all fields.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    try {
      const result = await signup(email, password, fullName);
      if (result.success) {
        setSuccess('Account created! Please login.');
        setTimeout(() => {
          setIsLoginView(true);
          resetFormState();
        }, 2000);
      } else {
        setError(result.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section id="auth-section" className="auth-section-container">
      <div className="auth-form-wrapper">
        <div className="auth-logo">
          <img src={SpotlightLogo} alt="Spotlight Logo" />
          <span className="auth-logo-text">Spotlight</span>
        </div>
        
        {isLoginView ? (
          <>
            <h2 className="auth-title">Welcome Back</h2>
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="auth-btn" disabled={authLoading}>
                {authLoading ? 'Logging In...' : 'Login'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="auth-title">Create Your Account</h2>
            <form onSubmit={handleSignupSubmit} className="auth-form">
              <input type="text" placeholder="Full Name" className="auth-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="auth-btn" disabled={authLoading}>
                {authLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </>
        )}

        {error && <p className="auth-message error">{error}</p>}
        {success && <p className="auth-message success">{success}</p>}
        
        <p className="auth-switch-text">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={handleToggleView} className="auth-switch-link">
            {isLoginView ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </section>
  );
};

export default AuthSection;
