import React from 'react';
import { useAuth } from '../AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">
          Welcome back, {currentUser?.displayName || 'User'}!
        </h1>
        <p className="dashboard-subtitle">
          This is your personalized dashboard. Explore events, manage your account, and more.
        </p>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Upcoming Events</h3>
            <p>No upcoming events scheduled yet.</p>
          </div>
          <div className="dashboard-card">
            <h3>My Profile</h3>
            <p>View and edit your profile information.</p>
          </div>
          <div className="dashboard-card">
            <h3>Settings</h3>
            <p>Manage your account and notification settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
