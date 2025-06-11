import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import SpotlightLogo from '../assets/spotlight-v1.png';
import './Auth.css'; // Import the new CSS

const Login = () => {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
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
        setTimeout(() => navigate('/'), 1500); // Redirect after a short delay
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-logo">
           <img src={SpotlightLogo} alt="Spotlight Logo" />
           <span className="auth-logo-text">Spotlight</span>
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn" disabled={authLoading}>
            {authLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        {error && <p className="auth-message error">{error}</p>}
        {success && <p className="auth-message success">{success}</p>}
        <p className="auth-switch-text">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-switch-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
