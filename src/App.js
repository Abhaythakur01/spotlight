import React from 'react';
// Import Outlet from react-router-dom to handle nested layouts
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Header from './Views/Header';
import Footer from './components/Footer'; // Import the new Footer component
import HomePage from './Views/HomePage';
import Dashboard from './Views/Dashboard';
import AuthPage from './Views/AuthPage';
import './App.css';
import './i18n';
import BlogPage from './Views/BlogPage.js';
import BlogPostPage from './Views/BlogPostPage.js';

/**
 * A layout component that includes the Header and Footer.
 * Any route nested inside this component will render with the Header and Footer.
 * The <Outlet /> component is a placeholder where the actual page component (e.g., HomePage) will be rendered.
 */
const MainLayout = () => (
  <>
    <Header />
    {/* UPDATE: Changed this div to a main element */}
    <main style={{ paddingTop: '70px', paddingBottom: '80px' }}>
      <Outlet />
    </main>
    <Footer />
  </>
);


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
  const { currentUser, authLoading } = useAuth();

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
    <div className="App min-h-screen">
      <Routes>
        {/* Routes that have the header and footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={currentUser ? <Dashboard /> : <HomePage />} />
          <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/auth" />} />
          
          {/* --- NEW BLOG ROUTES --- */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          {/* ----------------------- */}

        </Route>

        {/* Auth page route without header and footer */}
        <Route path="/auth" element={!currentUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

