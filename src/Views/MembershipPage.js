import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaIdCard, FaStar, FaRocket, FaCheckCircle } from 'react-icons/fa';
import './MembershipPage.css';

const MembershipPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJoinNowClick = () => {
    if (!currentUser) {
      navigate('/auth');
    } else {
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you would:
    // 1. Save the address and phone number to Firestore under the user's profile.
    //    e.g., await updateUserProfile(currentUser.uid, { address: formData });
    // 2. Initiate a payment flow with a payment gateway (e.g., Razorpay, Stripe).
    console.log("Submitting Membership Details:", { userId: currentUser.uid, ...formData });

    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 2000);
  };

  // The main CTA button logic
  const renderCTAButton = () => {
    if (!currentUser) {
      return <button onClick={handleJoinNowClick} className="cta-button">Login to Join</button>;
    }
    if (!showForm) {
      return <button onClick={handleJoinNowClick} className="cta-button">Get Your Membership</button>;
    }
    return null; // The form will be visible, so the button is hidden
  };

  return (
    <div className="membership-page">
      <div className="membership-container">
        
        {/* Left Column: The Offer */}
        <div className="offer-column">
          <div className="offer-header">
            <FaStar className="header-star-icon" />
            <h1>Unlock Your Stage</h1>
            <p className="subtitle">Become a Spotlight Pro Member and get the tools you need to shine.</p>
          </div>

          <ul className="features-list">
            <li><FaUpload className="feature-icon" /> <span>Upload Your Performance Videos</span></li>
            <li><FaIdCard className="feature-icon" /> <span>Receive an Exclusive Physical Membership Card</span></li>
            <li><FaRocket className="feature-icon" /> <span>Priority Access to Events & Workshops</span></li>
          </ul>

          <div className="pricing-box">
            <span className="price">₹500</span>
            <span className="price-duration">per year</span>
          </div>

          {!submissionSuccess && renderCTAButton()}

        </div>

        {/* Right Column: Visuals and Form */}
        <div className="visual-column">
          {submissionSuccess ? (
            <div className="success-container">
              <FaCheckCircle className="success-icon" />
              <h2>Thank You!</h2>
              <p>Your details are submitted. You are now being redirected to our secure payment partner.</p>
              <div className="success-spinner"></div>
            </div>
          ) : (
            <>
              {/* Virtual Membership Card */}
              <div className="card-container">
                <div className="membership-card">
                  <div className="card-header">
                    <span className="card-logo">Spotlight</span>
                    <span className="card-pro">PRO</span>
                  </div>
                  <div className="card-chip"></div>
                  <div className="card-holder-name">{currentUser?.displayName || 'ARTIST NAME'}</div>
                  <div className="card-footer">
                    <span>MEMBER SINCE '25</span>
                    <FaStar />
                  </div>
                </div>
              </div>

              {/* Address and Phone Form */}
              {currentUser && showForm && (
                <form onSubmit={handleFormSubmit} className="shipping-form">
                  <h3>Shipping Details</h3>
                  <p>Enter your details to receive your membership card.</p>
                  <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
                  <input type="text" name="address1" placeholder="Address Line 1" onChange={handleInputChange} required />
                  <input type="text" name="address2" placeholder="Address Line 2 (Optional)" onChange={handleInputChange} />
                  <div className="form-row">
                    <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
                    <input type="text" name="pincode" placeholder="Pincode" onChange={handleInputChange} required />
                  </div>
                  <input type="text" name="state" placeholder="State" onChange={handleInputChange} required />
                  <button type="submit" className="cta-button form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;