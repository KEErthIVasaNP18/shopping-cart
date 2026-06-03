import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUser, logoutUser } from '../redux/authSlice';
import './AuthPage.css';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Email is required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5500/sendOtp', { email });
      setOtpSent(true);
      setMessage(res.data.message || 'OTP Sent successfully!');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage('OTP is required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5500/verifyOtp', { email, otp });
      setMessage(res.data.message);
      
      // On success, dispatch redux and navigate
      dispatch(loginUser({ email }));
      navigate('/');
      setOtp('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isAuthenticated) {
    return (
      <div className="auth-container" data-aos="zoom-in">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
        
        <div className="auth-card auth-center">
          <h2>Welcome Back!</h2>
          <p className="auth-subtitle">Logged in as: <strong>{user?.email}</strong></p>
          <button className="btn-auth-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container" data-aos="zoom-in">
      <div className="auth-shape auth-shape-1"></div>
      <div className="auth-shape auth-shape-2"></div>
      
      <div className="auth-card">
        <h2 className="auth-title">Welcome</h2>
        <p className="auth-subtitle">Login securely using your email</p>

        {message && (
          <p className={`auth-message ${otpSent ? 'auth-success' : 'auth-error'}`}>
            {message}
          </p>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <button type="submit" className="btn-auth-submit">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="auth-form">
            <div className="form-group">
              <label>OTP Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                required
              />
            </div>
            <button type="submit" className="btn-auth-submit">
              Verify & Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
