import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './nav.css';
import { Link, useLocation } from 'react-router-dom';
import { RiSearchLine, RiMenuLine, RiCloseLine } from "react-icons/ri";

const Nav = ({search,setSearch}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { isAuthenticated, user } = useSelector((state) => state.auth);  const location = useLocation();
  const path = location.pathname;

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;



  return (
    <nav className="custom-nav">
      <div className="nav-container">
        <div className="nav-header">
          <Link to={'/'} className="nav-brand">Shoppiee</Link>

          <div className="nav-mobile-controls">
            {/* Mobile search toggle */}
            <button 
              className="nav-mobile-toggle" 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) setIsMenuOpen(false);
              }}
            >
              <RiSearchLine />
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="nav-mobile-toggle" 
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (!isMenuOpen) setIsSearchOpen(false);
              }}
            >
              {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
            </button>
          </div>
        </div>

        <form className={`nav-search-form ${isSearchOpen ? 'nav-search-open' : ''}`} onSubmit={(e) => e.preventDefault()}>
          <RiSearchLine className="nav-search-icon" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="nav-search-input"
            type="search"
            placeholder="Search Items..."
          />
        </form>

        <div className={`nav-content ${isMenuOpen ? 'nav-content-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to={"/"} className={`nav-link ${path === '/' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to={'/cart'} className={`nav-link nav-icon-link ${path === '/cart' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Cart
                {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
              </Link>
            </li>
            <li>
              <Link to={'/wishlist'} className={`nav-link nav-icon-link ${path === '/wishlist' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Wishlist
                {wishlistCount > 0 && <span className="nav-badge bg-danger">{wishlistCount}</span>}
              </Link>
            </li>
            <li>
              <Link to={'/contact'} className={`nav-link ${path === '/contact' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </li>
            <li>
              <Link to={'/posts/categories'} className={`nav-link ${path.includes('/posts/categories') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Categories</Link >
            </li>
            <li>
              {isAuthenticated ? (
                <Link to={'/profile'} className={`nav-link nav-login-link avatar-link ${path === '/profile' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                  <div className="user-avatar">
                    {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                  </div>
                </Link>
              ) : (
                <Link to={'/login'} className={`nav-link nav-login-link ${path === '/login' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
