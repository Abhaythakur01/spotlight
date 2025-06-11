// src/Views/Header.js

import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { FaMobileAlt, FaChevronDown } from 'react-icons/fa';
import SpotlightLogo from '../assets/spotlight-v1.png';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
// UPDATE: Import useLocation
import { useNavigate, Link, useLocation } from 'react-router-dom';
import HeroVideo from '../assets/hero-video.mp4';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // UPDATE: Get the current location

  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isExploreOpen, setExploreOpen] = useState(false);

  const profileRef = useRef(null);
  const exploreRef = useRef(null);

  // UPDATE: Check if the current page is the homepage
  const isHomePage = location.pathname === '/';

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  };

  return (
    // UPDATE: The container logic now also checks if it's the homepage
    <div className={!currentUser && isHomePage ? "landing-container" : "header-only-container"}>
      {/* UPDATE: The video now only renders on the homepage when logged out */}
      {!currentUser && isHomePage && (
        <video autoPlay loop muted className="background-video">
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="content-overlay">
        <header className="navbar">
          {/* The rest of your header JSX remains the same... */}
          <div className="logo">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={SpotlightLogo} alt="Spotlight Logo" height={30} />
              <span className="brand-name">Spotlight</span>
            </Link>
          </div>
          <nav className="nav-links">
            <div className="nav-explore-container" ref={exploreRef}>
              <button onClick={() => setExploreOpen(!isExploreOpen)} className="nav-button-link" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                Explore <FaChevronDown size={12} />
              </button>
              {isExploreOpen && (
                <div className="explore-dropdown">
                  <Link to="/blog" className="explore-dropdown-link" onClick={() => setExploreOpen(false)}>Blog</Link>
                  <a href="/#" className="explore-dropdown-link" onClick={() => setExploreOpen(false)}>Events (Coming Soon)</a>
                  <a href="/#" className="explore-dropdown-link" onClick={() => setExploreOpen(false)}>Success Stories</a>
                </div>
              )}
            </div>
            <a href="/#why-spotlight">{t('whySpotlight')}</a>
            <button onClick={() => handleNavigate('/auth')} className="nav-button-link">{t('register')}</button>
            <a href="/#help">{t('help')}</a>
            <Link to="/blog" className="nav-button-link">{t('blog')}</Link>
            <button onClick={() => handleNavigate('/auth')} className="nav-button-link">{t('account')}</button>
          </nav>
          <div className="header-actions">
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
                <button onClick={() => setProfileOpen(!isProfileOpen)} className="profile-icon-btn">
                  <div className="profile-initials-avatar">
                    {getInitials(currentUser.displayName)}
                  </div>
                </button>
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
        {/* UPDATE: The hero text now only renders on the homepage when logged out */}
        {!currentUser && isHomePage && (
          <section className="hero-text">
            <button onClick={() => handleNavigate('/auth')} className="register-btn">{t('registerNow')}</button>
            <div className="app-coming">
              <FaMobileAlt />
              <span>{t('appComingSoon')}</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Header;