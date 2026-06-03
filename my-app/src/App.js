// import logo from './logo.svg';
// import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from "./Footer";
import Nav from "./Nav";
import ProductList from "./pages/ProductList";
import ProductDetails from './pages/ProductDetails';
import AllCategories from './pages/AllCategory';
import CategoryPost from './pages/categorypost';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage'; // New styled AuthPage
import WishlistPage from './pages/WishlistPage'; // New WishlistPage
import RazorpayPayment from './RazorPayment';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div className="App">
        <BrowserRouter>

          <Nav search={search} setSearch={setSearch} />

          <Routes>
            <Route path='/' element={<ProductList search={search}/>} />
            <Route path='/posts/:id' element={<ProductDetails />} />
            <Route path='/category/:id' element={<CategoryPost />} />
            <Route path="/posts/categories" element={<AllCategories />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path='/verify_payment'  element={<RazorpayPayment/>} />


          </Routes>

          <Footer />

        </BrowserRouter>
    </div>
  );
}

export default App;

