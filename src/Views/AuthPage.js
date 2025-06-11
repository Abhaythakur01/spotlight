// src/Views/AuthPage.js

import React, { useState, useRef } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa'; // Import icons

const AuthPage = () => {
  const [view, setView] = useState('login'); // 'login', 'signup', or 'forgot'
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { login, signup, resetPassword, authLoading } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const result = await login(emailRef.current.value, passwordRef.current.value);
      if (!result.success) {
        setError(result.error || 'Failed to log in.');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const result = await signup(emailRef.current.value, passwordRef.current.value, fullNameRef.current.value);
      if (!result.success) {
        setError(result.error || 'Failed to sign up.');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const result = await resetPassword(emailRef.current.value);
      if (result.success) {
        setMessage('Check your inbox for further instructions.');
      } else {
        setError(result.error || 'Failed to send password reset email.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };
  
  // A small component for the form header
  const AuthHeader = ({ title, subtitle }) => (
    <div className="auth-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );

  return (
    <div className="auth-page">
      <div className="auth-container">
        {view === 'login' && (
          <>
            <AuthHeader title="Welcome Back!" subtitle="Sign in to continue to Spotlight" />
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" ref={emailRef} required />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" ref={passwordRef} required />
              </div>
              <button type="submit" className="auth-btn" disabled={authLoading}>
                {authLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <div className="auth-switch-view">
              <button onClick={() => setView('forgot')}>Forgot Password?</button>
            </div>
          </>
        )}

        {view === 'signup' && (
          <>
            <AuthHeader title="Create Account" subtitle="Get started with Spotlight today" />
            <form onSubmit={handleSignupSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="signup-fullname">Full Name</label>
                <input id="signup-fullname" type="text" ref={fullNameRef} required />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input id="signup-email" type="email" ref={emailRef} required />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" ref={passwordRef} required />
              </div>
              <button type="submit" className="auth-btn" disabled={authLoading}>
                {authLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </>
        )}

        {view === 'forgot' && (
            <>
            <AuthHeader title="Reset Password" subtitle="We'll send you a link to reset your password" />
            <form onSubmit={handleResetSubmit} className="auth-form">
                <div className="form-group">
                <label htmlFor="reset-email">Email</label>
                <input id="reset-email" type="email" ref={emailRef} required />
                </div>
                <button type="submit" className="auth-btn" disabled={authLoading}>
                {authLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            </>
        )}

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-message">{message}</p>} 
        
        <div className="auth-divider">or</div>

        <div className="social-login-container">
          <button className="social-login-btn google"><FaGoogle /></button>
          <button className="social-login-btn facebook"><FaFacebookF /></button>
          <button className="social-login-btn apple"><FaApple /></button>
        </div>

        <div className="auth-switch-view">
          {view === 'login' && (
            <p>Don't have an account? <button onClick={() => setView('signup')}>Sign Up</button></p>
          )}
          {view === 'signup' && (
            <p>Already have an account? <button onClick={() => setView('login')}>Sign In</button></p>
          )}
          {view === 'forgot' && (
            <p>Remembered your password? <button onClick={() => setView('login')}>Sign In</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;