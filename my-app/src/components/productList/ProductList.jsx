import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../post/post';
import Carousel from '../carousel/carousel';
import './ProductList.css';
import '../../pages/mainScreens/categories.css';

function ProductList({ search }) {
  const [posts, setPosts] = useState([]);

  // Fetch products
  const fetchPost = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // Filter posts based on the search term
  const filteredPosts = posts.filter((product) =>
    product.Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-list-page">
      <Carousel />
      <div className="product-list-section">
        <div className="page-container">
          <h1 className="section-title">Latest Posts</h1>
          <div className="product-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((product) => (
                <Post key={product._id} product={product} />
              ))
            ) : (
              <h3 className="no-products-msg">No matching products found</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
