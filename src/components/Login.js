// src/Components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const Login = () => {
  const { login, currentUser, authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) return setMessage('Please enter both email and password.');

    const result = await login(email, password);
    setMessage(result.success ? 'Logged in!' : `Login failed: ${result.error}`);
  };

  if (currentUser) return (
    <div className="text-white text-center mt-10">Welcome, {currentUser.email}!</div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-inter">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn">{authLoading ? 'Loading...' : 'Login'}</button>
        </form>
        {message && <p className="text-sm text-red-400 mt-4 text-center">{message}</p>}
        <p className="text-center mt-4 text-gray-400">New here? <a href="/signup" className="text-yellow-400 font-bold">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
