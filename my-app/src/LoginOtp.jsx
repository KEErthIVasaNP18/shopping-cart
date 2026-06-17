import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OtpLoginForm.css';

const OtpLoginForm = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For navigation

  const sendOtp = async () => {
    if (!email) return setMessage("Email is required");

    try {
      const res = await axios.post('http://localhost:5500/sendOtp', { email });
      setOtpSent(true);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };


  const verifyOtp = async () => {
    if (!otp) return setMessage("OTP is required");

    try {
      const res = await axios.post('http://localhost:5500/verifyOtp', { email, otp });
      setMessage(res.data.message);

      // Save login info
      localStorage.setItem("userEmail", email);

      // Redirect regardless of backend "success" flag
      navigate("/");

      setOtp("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };


  return (
    <div className="otp-container">
      <h2>Email OTP Login</h2>

      {!otpSent ? (
        <>
          <input
            type="email"
            className="otp-input"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={sendOtp} className="otp-button">
            Send OTP
          </button>
        </>
      ) : (
        <>
          <p>OTP sent to: {email}</p>
          <input
            type="text"
            className="otp-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} className="otp-button">
            Verify OTP
          </button>
        </>
      )}

      {message && <p className="otp-message">{message}</p>}
    </div>
  );
};

export default OtpLoginForm;
