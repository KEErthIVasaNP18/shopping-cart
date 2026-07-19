import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="page-container contact-page-wrapper">
      <div className="glass-card contact-card">
        
        {/* Contact Information */}
        <div className="contact-info-section">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-desc">
            We'd love to hear from you. Please fill out this form or shoot us an email.
          </p>
          
          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-icon-wrapper icon-email">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>support@shoppiee.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-wrapper icon-phone">
                <FaPhoneAlt />
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>+91 8838781507</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-wrapper icon-office">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h4>Office</h4>
                <p>Madurai-18</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            {submitted && (
              <div className="contact-success-msg">
                Thank you! Your message has been sent.
              </div>
            )}
            <div className="contact-input-group">
              <input 
                type="text" 
                name="name" 
                placeholder="e.g. John Doe" 
                required 
                value={formData.name}
                onChange={handleChange}
                className="contact-input"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="e.g. john@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
                className="contact-input"
              />
            </div>
            <input 
              type="text" 
              name="subject" 
              placeholder="How can we help?" 
              required 
              value={formData.subject}
              onChange={handleChange}
              className="contact-input"
            />
            <textarea 
              name="message" 
              rows="5" 
              placeholder="Write your message here..." 
              required 
              value={formData.message}
              onChange={handleChange}
              className="contact-textarea"
            ></textarea>
            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
