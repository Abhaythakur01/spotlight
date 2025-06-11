import React from 'react';
// Import Outlet from react-router-dom to handle nested layouts
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Header from './Views/Header';
import HomePage from './Views/HomePage';
import Dashboard from './Views/Dashboard';
import AuthPage from './Views/AuthPage';
import './App.css';
import './i18n';

/**
 * A layout component that includes the Header.
 * Any route nested inside this component will render with the Header.
 * The <Outlet /> component is a placeholder where the actual page component (e.g., HomePage) will be rendered.
 */
const MainLayout = () => (
  <>
    <Header />
    <Outlet />
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
    <div className="App">
      <Routes>
        {/* UPDATE: Routes that should have the header are now nested inside the MainLayout.
          This ensures the header is only present on these pages.
        */}
        <Route element={<MainLayout />}>
          <Route path="/" element={currentUser ? <Dashboard /> : <HomePage />} />
          {/* You can add other pages that need a header here, e.g., <Route path="/blog" element={<BlogPage />} /> */}
        </Route>

        {/* The authentication page route is outside the MainLayout, so it will NOT have the header.
          This prevents the "page below" issue.
        */}
        <Route path="/auth" element={!currentUser ? <AuthPage /> : <Navigate to="/" />} />
        
        {/* A fallback route to navigate home if no other route matches */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
