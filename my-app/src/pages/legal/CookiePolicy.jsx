import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CookiePolicy = () => {
  return (
    <div className="page-container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px' }}>
        <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--primary-color, #007bff)', textDecoration: 'none' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home
        </Link>
        <h1 style={{ marginBottom: '20px' }}>Cookie Policy</h1>
        <p>This Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our website.</p>
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>What are Cookies?</h3>
        <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Why We Use Cookies</h3>
        <p>We use first party and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies.</p>
        <p style={{ marginTop: '30px', fontSize: '0.9rem', color: '#666' }}>Last updated: July 2026</p>
      </div>
    </div>
  );
};

export default CookiePolicy;
