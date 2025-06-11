import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { FaMobileAlt, FaUserCircle } from 'react-icons/fa';
import SpotlightLogo from '../assets/spotlight-v1.png';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={currentUser ? "header-only-container" : "landing-container"}>
      <header className="navbar">
        <div className="logo">
          {/* Link logo back to homepage */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={SpotlightLogo} alt="Spotlight Logo" height={30} />
            <span className="brand-name">Spotlight</span>
          </Link>
        </div>
        <nav className="nav-links">
          {/* Restoring all your navigation links */}
          <a href="/#why-spotlight">{t('whySpotlight')}</a>
          <a href="/#events">{t('events')}</a>
          {/* This button now correctly navigates to the auth page */}
          <button onClick={() => handleNavigate('/auth')} className="nav-button-link">{t('register')}</button>
          <a href="/#help">{t('help')}</a>
          <a href="/#blog">{t('blog')}</a>
           {/* This button also navigates to the auth page */}
          <button onClick={() => handleNavigate('/auth')} className="nav-button-link">{t('account')}</button>
        </nav>
        <div className="header-actions">
           {/* Restoring the full language selector */}
          <select 
            onChange={(e) => i18n.changeLanguage(e.target.value)} 
            className="language-selector" 
            defaultValue={i18n.language}
          >
            <option value="">{t('Select Language')}</option>
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="ml">മലയാളം (Malayalam)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
          {currentUser ? (
            <div className="profile-container" ref={profileRef}>
              <button onClick={() => setProfileOpen(!isProfileOpen)} className="profile-icon-btn"><FaUserCircle size={28} /></button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <p className="profile-name">{currentUser.displayName || 'User'}</p>
                    <p className="profile-email">{currentUser.email}</p>
                  </div>
                  <button onClick={logout} className="dropdown-logout-btn">{t('logout')}</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => handleNavigate('/auth')} className="get-started-btn">Login/Signup</button>
          )}
        </div>
      </header>
      {!currentUser && (
        <section className="hero-text">
           {/* The h1 and h2 tags have been removed to prevent overlapping text */}
          <button onClick={() => handleNavigate('/auth')} className="register-btn">{t('registerNow')}</button>
          <div className="app-coming">
            <FaMobileAlt />
            <span>{t('appComingSoon')}</span>
          </div>
        </section>
      )}
    </div>
  );
};

export default Header;
