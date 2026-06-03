import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './nav.css';
import { Link, useLocation } from 'react-router-dom';
import { RiSearchLine, RiMenuLine, RiCloseLine } from "react-icons/ri";

const Nav = ({search,setSearch}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const location = useLocation();
  const path = location.pathname;

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <nav className="custom-nav">
      <div className="nav-container">
        <Link to={'/'} className="nav-brand">Shoppiee</Link>

        {/* Mobile menu toggle */}
        <button 
          className="nav-mobile-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>

        <div className={`nav-content ${isMenuOpen ? 'nav-content-open' : ''}`}>
          <form className="nav-search-form" onSubmit={(e) => e.preventDefault()}>
            <RiSearchLine className="nav-search-icon" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="nav-search-input"
              type="search"
              placeholder="Search Items..."
            />
          </form>

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
              <Link to={'/posts/categories'} className={`nav-link ${path.includes('/posts/categories') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Categories</Link >
            </li>
            <li>
              <Link to={'/login'} className={`nav-link nav-login-link ${path === '/login' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
