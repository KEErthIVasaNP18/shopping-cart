import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIncrease = (item) => dispatch(addToCart(item));
    const handleDecrease = (item) => dispatch(removeFromCart(item._id));

    // Calculate total amount
    const totalAmount = cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0);

    return (
        <div className="cart-page page-container">
            <h2 className="cart-title">Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="empty-cart-msg">
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any products yet.</p>
                </div>
            ) : (
                <div className="cart-content">
                    {/* Left Side: Cart Items */}
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item-card glass-card">
                                <div className="cart-item-img-container">
                                    <img
                                        src={item.Img}
                                        alt={item.Name}
                                        className="cart-item-img"
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <h5 className="cart-item-title">{item.Name}</h5>
                                    <p className="cart-item-price">₹{item.Price}</p>
                                    <div className="cart-item-actions">
                                        <div className="cart-qty-controls">
                                            <button 
                                                className="btn-qty" 
                                                onClick={() => handleDecrease(item)}
                                            >
                                                -
                                            </button>
                                            <span className="qty-text">{item.quantity}</span>
                                            <button 
                                                className="btn-qty" 
                                                onClick={() => handleIncrease(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            className="btn-remove"
                                            onClick={() => dispatch(removeFromCart(item._id))}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Total Price & Checkout */}
                    <div className="cart-summary-section">
                        <div className="cart-summary glass-card">
                            <h4 className="summary-title">Order Summary</h4>
                            <hr className="summary-divider" />
                            <div className="summary-row">
                                <span className="summary-text">Total Items:</span>
                                <span className="summary-text">{cartItems.length}</span>
                            </div>
                            <div className="summary-row summary-total-row">
                                <span className="summary-total">Total Amount:</span>
                                <span className="summary-total">₹{totalAmount}</span>
                            </div>
                            <button 
                                className="btn-checkout"
                                onClick={() => {
                                    if (!isAuthenticated) {
                                        navigate('/login');
                                    } else {
                                        navigate('/shipping', { state: { amount: totalAmount } });
                                    }
                                }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
