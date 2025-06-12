import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';

// Import our new SmoothScroller
import SmoothScroller from './components/SmoothScroller';

// Import Views (Pages)
import HomePage from './Views/HomePage';
import AuthPage from './Views/AuthPage';
import Dashboard from './Views/Dashboard';
import BlogPage from './Views/BlogPage';
import BlogPostPage from './Views/BlogPostPage';
import ArtistPage from './Views/ArtistPage';
import MembershipPage from './Views/MembershipPage';

// Import Components
import Header from './Views/Header';
import Footer from './components/Footer';

// Import CSS
import './App.css';
import i18n from './i18n';

// --- AppContent: Manages loading state and renders the main layout ---
function AppContent() {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    // Wrap the entire app content with SmoothScroller
    <SmoothScroller>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <HomePage />} />
            <Route path="/auth" element={currentUser ? <Navigate to="/dashboard" /> : <AuthPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:postId" element={<BlogPostPage />} />
            <Route path="/artists/:artistType" element={<ArtistPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SmoothScroller>
  );
}

// --- ProtectedRoute: A wrapper to secure routes for logged-in users ---
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
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
