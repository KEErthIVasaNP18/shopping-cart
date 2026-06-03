import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import './WishlistPage.css';

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-page page-container">
      <h2 className="wishlist-title">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist-msg">
          <h2>Your wishlist is empty</h2>
          <p>Explore our products and find something you love!</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item._id} className="wishlist-card glass-card">
              <img
                src={item.Img}
                alt={item.Name}
                className="wishlist-img"
              />
              <div className="wishlist-card-body">
                <h5 className="wishlist-card-title">{item.Name}</h5>
                <p className="wishlist-card-price">₹{item.Price}</p>
                <div className="wishlist-actions">
                  <button
                    className="btn btn-wishlist-remove"
                    onClick={() => dispatch(removeFromWishlist(item._id))}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-wishlist-cart"
                    onClick={() => {
                      dispatch(addToCart(item));
                      dispatch(removeFromWishlist(item._id));
                    }}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
