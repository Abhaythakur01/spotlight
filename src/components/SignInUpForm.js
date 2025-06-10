// src/Components/SignInUpForm.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Correct path from src/Components/ to src/AuthContext.js

const SignInUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const { signup, login, currentUser, authLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (authLoading) {
      setMessage('Authentication system is loading, please wait...');
      return;
    }

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    if (isLogin) {
      const result = await login(email, password);
      if (result.success) {
        setMessage('Logged in successfully!');
      } else {
        setMessage(`Login failed: ${result.error}`);
      }
    } else {
      const result = await signup(email, password);
      if (result.success) {
        setMessage('Signed up successfully! Please login with your new account.');
        setIsLogin(true);
      } else {
        setMessage(`Sign up failed: ${result.error}`);
      }
    }
  };

  if (currentUser) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-lg text-white">Welcome, {currentUser.email}!</p>
        <p className="text-sm text-gray-300">Your User ID: {currentUser.uid}</p>
        <p className="text-sm text-gray-300">This user is connected to your Firebase project. Any data you store will be associated with this ID.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-inter">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            disabled={authLoading}
          >
            {authLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm text-red-400">{message}</p>
        )}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
              }}
              className="text-yellow-400 hover:text-yellow-300 font-bold transition duration-200"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInUpForm;
