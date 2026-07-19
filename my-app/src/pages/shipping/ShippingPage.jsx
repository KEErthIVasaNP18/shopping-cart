import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './ShippingPage.css';

const ShippingPage = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const amount = location.state?.amount || 0;

    const [formData, setFormData] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Load saved address from localStorage based on user email
        const savedAddresses = JSON.parse(localStorage.getItem('shipping_addresses') || '{}');
        if (user && user.email && savedAddresses[user.email]) {
            setFormData(savedAddresses[user.email]);
        }
    }, [isAuthenticated, navigate, user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Save address to localStorage linked to user email
        if (user && user.email) {
            const savedAddresses = JSON.parse(localStorage.getItem('shipping_addresses') || '{}');
            savedAddresses[user.email] = formData;
            localStorage.setItem('shipping_addresses', JSON.stringify(savedAddresses));
        }

        // Proceed to payment checkout
        navigate('/verify_payment', { state: { amount, shippingInfo: formData } });
    };

    if (!isAuthenticated) return null;

    return (
        <div className="shipping-page" data-aos="fade-up">
            <div className="shipping-shape shipping-shape-1"></div>
            <div className="shipping-shape shipping-shape-2"></div>
            
            <div className="shipping-card">
                <h2 className="shipping-title">Shipping Address</h2>
                
                <form className="shipping-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Address Line 1</label>
                        <input 
                            type="text" 
                            name="addressLine1" 
                            value={formData.addressLine1} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Address Line 2 (Optional)</label>
                        <input 
                            type="text" 
                            name="addressLine2" 
                            value={formData.addressLine2} 
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="row">
                        <div className="form-group">
                            <label>City</label>
                            <input 
                                type="text" 
                                name="city" 
                                value={formData.city} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input 
                                type="text" 
                                name="state" 
                                value={formData.state} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input 
                                type="text" 
                                name="zipCode" 
                                value={formData.zipCode} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn-proceed">
                        Proceed to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage;
