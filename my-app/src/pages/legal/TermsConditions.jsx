import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const TermsConditions = () => {
  return (
    <div className="page-container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px' }}>
        <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--primary-color, #007bff)', textDecoration: 'none' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home
        </Link>
        <h1 style={{ marginBottom: '20px' }}>Terms & Conditions</h1>
        <p>Welcome to our Terms and Conditions of Use. These terms and conditions outline the rules and regulations for the use of our Website.</p>
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>License</h3>
        <p>Unless otherwise stated, we and/or our licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this from the website for your own personal use subjected to restrictions set in these terms and conditions.</p>
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>User Comments</h3>
        <p>Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website.</p>
        <p style={{ marginTop: '30px', fontSize: '0.9rem', color: '#666' }}>Last updated: July 2026</p>
      </div>
    </div>
  );
};

export default TermsConditions;
