import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import SpotlightLogo from '../assets/spotlight-v1.png';
import './Auth.css'; // Import the new CSS

const Signup = () => {
  const { signup, authLoading } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
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
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(result.error || 'Signup failed. Please try again.');
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
        <h2 className="auth-title">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              className="auth-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
            {authLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
         {error && <p className="auth-message error">{error}</p>}
        {success && <p className="auth-message success">{success}</p>}
        <p className="auth-switch-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
