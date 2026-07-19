import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
import { clearCart } from '../../redux/cartSlice';
import { clearWishlist } from '../../redux/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import './UserDetail.css';

const UserDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize state with empty strings
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    address: '',
    district: '',
    state: '',
    country: '',
  });

  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Load existing profile data from localStorage on mount
  useEffect(() => {
    if (user) {
      const userKey = user?.email || user?.name || 'default_user';
      const storedData = localStorage.getItem(`profile_${userKey}`);
      if (storedData) {
        setProfile(JSON.parse(storedData));
        setIsEditing(false); // If profile exists, show view mode first
      } else {
        // Pre-fill name if available from user object
        setProfile((prev) => ({ ...prev, name: user.name || user.email || '' }));
        setIsEditing(true); // If no profile, show edit mode
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Fallback to a default key if user.email is missing for some reason
    const userKey = user?.email || user?.name || 'default_user';
    
    localStorage.setItem(`profile_${userKey}`, JSON.stringify(profile));
    setIsSaved(true);
    setIsEditing(false); // Switch to view mode after saving
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    dispatch(clearCart());
    dispatch(clearWishlist());
    navigate('/');
  };

  if (!user) {
    return (
      <div className="user-detail-container" data-aos="fade-up">
        <div className="user-detail-card">
          <h2>Please log in to view your profile.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail-container" data-aos="fade-up">
      <div className="user-detail-card">
        <h2 className="user-detail-title">My Profile</h2>
        <p className="user-detail-subtitle">
          {isEditing ? 'Update your personal information' : 'Your saved personal information'}
        </p>

        {isSaved && <div className="user-detail-success">Profile updated successfully!</div>}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="user-detail-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  required
                  min="0"
                  max="120"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="123 Main St, Apartment 4B"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>District</label>
                <input
                  type="text"
                  name="district"
                  value={profile.district}
                  onChange={handleChange}
                  placeholder="City/District"
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  placeholder="State/Province"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={profile.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
            </div>

            <button type="submit" className="btn-user-save">
              Save Profile
            </button>
               <button type="button" onClick={handleLogout} className="btn-user-logout">
                Logout
              </button>
          </form>
        ) : (
          <div className="user-detail-view">
            <div className="view-list">
              <div className="view-item">
                <span className="view-label">Full Name:</span>
                <span className="view-value">{profile.name}</span>
              </div>
              <div className="view-item">
                <span className="view-label">Age:</span>
                <span className="view-value">{profile.age}</span>
              </div>
              <div className="view-item">
                <span className="view-label">Address:</span>
                <span className="view-value">{profile.address}</span>
              </div>
              <div className="view-item">
                <span className="view-label">District:</span>
                <span className="view-value">{profile.district}</span>
              </div>
              <div className="view-item">
                <span className="view-label">State:</span>
                <span className="view-value">{profile.state}</span>
              </div>
              <div className="view-item">
                <span className="view-label">Country:</span>
                <span className="view-value">{profile.country}</span>
              </div>
            </div>
            
            <div className="btn-group-user">
              <button type="button" onClick={handleEdit} className="btn-user-edit">
                Edit Profile
              </button>
              <button type="button" onClick={handleLogout} className="btn-user-logout">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
