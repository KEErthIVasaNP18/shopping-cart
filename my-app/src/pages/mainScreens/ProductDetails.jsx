import React, { useEffect, useState } from 'react'
// import Nav from '../Nav'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './productdetail.css'


const ProductDetails = () => {
  const [pdetail, setPdetails] = useState(null)
  const { id } = useParams()

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/posts/${id}`
      );
      setPdetails(response.data);
    } catch (error) {
      console.log("Error fetching post");
    }
  };

  fetchData();
}, [id]);

  if (!pdetail) {
    return <h1 className="loading-msg">Loading....</h1>
  }

  return (
    <div className="product-detail-page page-container">
      <h1 className="product-detail-title">Product Details</h1>
      
      <div className="product-detail-card glass-card">
        <div className="product-detail-img-wrapper">
          <img src={pdetail.Img} alt={pdetail.Name} className="product-detail-img" />
        </div>

        <div className="product-detail-info">
          <h2 className="detail-name">{pdetail.Name}</h2>
          <div className="detail-about">
            <strong>About this product:</strong>
            <p>{pdetail.About}</p>
          </div>
          <p className="detail-price">₹ {pdetail.Price}</p>
        </div>
      </div>
    </div>
  );

}

export default ProductDetails