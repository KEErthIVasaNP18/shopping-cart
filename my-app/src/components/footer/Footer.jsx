import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaPinterestP, FaRegEnvelope, FaArrowRight, FaChevronDown } from "react-icons/fa";
import './footer.css';

const Footer = () => {
  const [openCol, setOpenCol] = useState(null);

  const toggleCol = (index) => {
    setOpenCol(openCol === index ? null : index);
  };

  return (
    <footer className="footer-section">
      <div className="footer-row">
        
        {/* Column 1: Brand & Description */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">Shoppiee</h2>
          <p className="footer-desc">
            Subscribe to our newsletter to watch more videos on website development and get immediate notification of our latest updates and offers.
          </p>
        </div>
        
        {/* Column 2: Office */}
        <div className={`footer-col ${openCol === 2 ? 'open' : ''}`}>
          <h3 className="footer-heading" onClick={() => toggleCol(2)}>
            Office 
            <FaChevronDown className="toggle-icon" />
            <div className="footer-underline"><span></span></div>
          </h3>
          <div className="footer-content">
            <p>Tamil Nadu , Madurai-18</p>
            <p className="footer-email">support@shoppiee.com</p>
            <h4 className="footer-phone">+91 - 8838781507</h4>
          </div>
        </div>
        
        {/* Column 3: Links */}
        <div className={`footer-col ${openCol === 3 ? 'open' : ''}`}>
          <h3 className="footer-heading" onClick={() => toggleCol(3)}>
            Links 
            <FaChevronDown className="toggle-icon" />
            <div className="footer-underline"><span></span></div>
          </h3>
          <div className="footer-content">
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/posts/categories">Categories</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy">Cookie Policy</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Column 4: Newsletter */}
        <div className={`footer-col ${openCol === 4 ? 'open' : ''}`}>
          <h3 className="footer-heading" onClick={() => toggleCol(4)}>
            Newsletter 
            <FaChevronDown className="toggle-icon" />
            <div className="footer-underline"><span></span></div>
          </h3>
          <div className="footer-content">
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <FaRegEnvelope className="envelope-icon" />
              <input type="email" placeholder="Enter your email id" required />
              <button type="submit" className="submit-arrow"><FaArrowRight /></button>
            </form>
            
            <div className="footer-social-icons">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://whatsapp.com/" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer"><FaPinterestP /></a>
            </div>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="footer-copyright">Shoppiee &copy; 2025 - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
