// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Header from './Views/Header';
import HomePage from './Views/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import './i18n';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { currentUser, authLoading, logout, userId } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-lg">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <div className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-lg shadow-lg z-50">
        {currentUser ? (
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold">Logged in as: {currentUser.email}</p>
            <p className="text-xs text-gray-400">User ID: {userId}</p>
            <button
              onClick={logout}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-sm">Not logged in.</p>
        )}
      </div>
    </div>
  );
}
