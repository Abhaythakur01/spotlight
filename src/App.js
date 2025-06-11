import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';

// Import Views (Pages)
import HomePage from './Views/HomePage';
import AuthPage from './Views/AuthPage';
import Dashboard from './Views/Dashboard';
import BlogPage from './Views/BlogPage';
import BlogPostPage from './Views/BlogPostPage';
import ArtistPage from './Views/ArtistPage';
import MembershipPage from './Views/MembershipPage'; // <-- IMPORT THE NEW MEMBERSHIP PAGE

// Import Components
import Header from './Views/Header';
import Footer from './components/Footer';

// Import CSS
import './App.css';
import i18n from './i18n'; // i18n is initialized here

// --- AppContent: Manages loading state and renders the main layout ---
function AppContent() {
  const { currentUser, authLoading } = useAuth();

  // Show a loading spinner while checking for user authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Once loading is complete, render the main application layout
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* If logged in, redirect from home to dashboard, otherwise show HomePage */}
          <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <HomePage />} />
          
          {/* If logged in, redirect from auth page to dashboard, otherwise show AuthPage */}
          <Route path="/auth" element={currentUser ? <Navigate to="/dashboard" /> : <AuthPage />} />
          
          {/* Protected dashboard route */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Public blog routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />

          {/* Dynamic route for artist pages */}
          <Route path="/artists/:artistType" element={<ArtistPage />} />

          {/* --- NEW MEMBERSHIP PAGE ROUTE --- */}
          <Route path="/membership" element={<MembershipPage />} />

          {/* Fallback redirect for any other path */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// --- ProtectedRoute: A wrapper to secure routes for logged-in users ---
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  // If no user is logged in, redirect them to the authentication page
  return currentUser ? children : <Navigate to="/auth" />;
}

// --- App: The main entry point that sets up providers ---
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
