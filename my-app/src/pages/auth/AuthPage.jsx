import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../redux/authSlice';
import { clearCart, setCart } from '../../redux/cartSlice';
import { clearWishlist, setWishlist } from '../../redux/wishlistSlice';
import './AuthPage.css';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // 'login', 'register', 'forgot-password'
  const [view, setView] = useState('login');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Helper to get users from localStorage
  const getUsersDb = () => {
    const users = localStorage.getItem('mock_users_db');
    return users ? JSON.parse(users) : [];
  };

  // Helper to save users to localStorage
  const saveUsersDb = (users) => {
    localStorage.setItem('mock_users_db', JSON.stringify(users));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = getUsersDb();
    
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setMessage('Registration failed: User already exists');
      return;
    }

    users.push({ name, email: email.toLowerCase(), password });
    saveUsersDb(users);
    
    setMessage('Registration successful. Please log in.');
    setView('login');
    setPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsersDb();
    const existingUser = users.find(u => u.email === email.toLowerCase() && u.password === password);
    
    if (existingUser) {
      setMessage('Login successful!');
      
      const token = 'mock-jwt-token-' + Date.now();
      
      // Store locally (async/sync)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(existingUser));

      dispatch(loginUser({ token, user: existingUser }));

      // Restore user-specific cart and wishlist
      const savedCart = localStorage.getItem(`cart_${existingUser.email}`);
      if (savedCart) dispatch(setCart(JSON.parse(savedCart)));
      
      const savedWishlist = localStorage.getItem(`wishlist_${existingUser.email}`);
      if (savedWishlist) dispatch(setWishlist(JSON.parse(savedWishlist)));

      navigate('/');
    } else {
      setMessage('Login failed: Invalid credentials');
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const users = getUsersDb();
    const existingUser = users.find(u => u.email === email.toLowerCase());
    
    if (existingUser) {
      setOtpSent(true);
      setMessage('Mock OTP sent! (Just enter 123456 to verify)');
    } else {
      setMessage('User not found in local records.');
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (otp !== '123456') {
      setMessage('Password reset failed: Invalid OTP');
      return;
    }

    const users = getUsersDb();
    const userIndex = users.findIndex(u => u.email === email.toLowerCase());
    
    if (userIndex !== -1) {
      users[userIndex].password = password;
      saveUsersDb(users);
      setMessage('Password reset successfully! You can now log in.');
      setView('login');
      setPassword('');
      setOtp('');
      setOtpSent(false);
    } else {
      setMessage('Password reset failed: User not found.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    dispatch(clearCart());
    dispatch(clearWishlist());
  };

  if (isAuthenticated) {
    return (
      <div className="auth-container" data-aos="zoom-in">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
        
        <div className="auth-card auth-center">
          <h2>Welcome Back!</h2>
          <p className="auth-subtitle">Logged in as: <strong>{user?.name || user?.email}</strong></p>
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
        <h2 className="auth-title">
          {view === 'login' && 'Welcome Back'}
          {view === 'register' && 'Create Account'}
          {view === 'forgot-password' && 'Reset Password'}
        </h2>
        <p className="auth-subtitle">
          {view === 'login' && 'Login securely (Local Mode)'}
          {view === 'register' && 'Sign up to get started (Local Mode)'}
          {view === 'forgot-password' && 'Enter your email to receive a mock OTP'}
        </p>

        {message && (
          <p className={`auth-message ${message.toLowerCase().includes('failed') || message.toLowerCase().includes('error') ? 'auth-error' : 'auth-success'}`}>
            {message}
          </p>
        )}

        {view === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-auth-submit">Log In</button>
            <p className="auth-toggle">
              Don't have an account? <span onClick={() => { setView('register'); setMessage(''); }}>Register</span>
            </p>
            <p className="auth-toggle">
              <span onClick={() => { setView('forgot-password'); setMessage(''); }}>Forgot Password?</span>
            </p>
          </form>
        )}

        {view === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-auth-submit">Register</button>
            <p className="auth-toggle">
              Already have an account? <span onClick={() => { setView('login'); setMessage(''); }}>Log In</span>
            </p>
          </form>
        )}

        {view === 'forgot-password' && !otpSent && (
          <form onSubmit={handleSendOtp} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn-auth-submit">Send Mock OTP</button>
            <p className="auth-toggle">
              Remember your password? <span onClick={() => { setView('login'); setMessage(''); }}>Log In</span>
            </p>
          </form>
        )}

        {view === 'forgot-password' && otpSent && (
          <form onSubmit={handleResetPassword} className="auth-form">
            <div className="form-group">
              <label>OTP Code (Enter 123456)</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-auth-submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
