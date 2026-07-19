import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="page-container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px' }}>
        <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--primary-color, #007bff)', textDecoration: 'none' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home
        </Link>
        <h1 style={{ marginBottom: '20px' }}>Privacy Policy</h1>
        <p>Your privacy is important to us. This privacy policy explains what personal data we collect from you and how we use it.</p>
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Information We Collect</h3>
        <p>We collect data to operate effectively and provide you the best experiences with our services.</p>
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>How We Use Your Data</h3>
        <p>We use the data we collect to operate our business and provide you the products we offer, which includes using data to improve our products and personalize your experiences.</p>
        <p style={{ marginTop: '30px', fontSize: '0.9rem', color: '#666' }}>Last updated: July 2026</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
