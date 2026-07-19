// import logo from './logo.svg';
// import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";
import ProductList from "./components/productList/ProductList";
import ProductDetails from './pages/mainScreens/ProductDetails';
import AllCategories from './components/categories/AllCategory';
import CategoryPost from './pages/mainScreens/categorypost';
import ContactPage from './pages/mainScreens/ContactPage';
import CartPage from './pages/cart/CartPage';
import AuthPage from './pages/auth/AuthPage'; // New styled AuthPage
import WishlistPage from './pages/mainScreens/WishlistPage'; // New WishlistPage
import RazorpayPayment from './pages/razorpay/RazorPayment';
import UserDetail from './pages/user/UserDetail'; // New User Detail Page
import ShippingPage from './pages/shipping/ShippingPage'; // New Shipping Page
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiePolicy from './pages/legal/CookiePolicy';
import TermsConditions from './pages/legal/TermsConditions';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [search, setSearch] = useState('');

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isAuthenticated, user]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Nav search={search} setSearch={setSearch} />}

        <Routes>
          {isAuthenticated ? (
            <>
              <Route path='/' element={<ProductList search={search} />} />
              <Route path='/posts/:id' element={<ProductDetails />} />
              <Route path='/category/:id' element={<CategoryPost />} />
              <Route path="/posts/categories" element={<AllCategories />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<UserDetail />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path='/verify_payment' element={<RazorpayPayment />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>

        {isAuthenticated && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;

