// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Post from '../components/post';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from '../carousel';
// import './ProductList.css'; // Create this CSS file
// import './categories.css'; // or the path to your CSS module


// function ProductList({ search }) {
//   const [posts, setPosts] = useState([]);

//   // Fetch products
//   const fetchPost = async () => {
//     try {
//       const response = await axios.get('http://localhost:5500/api/posts')
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };


//   useEffect(() => {
//     fetchPost();
//   }, []);

//   const filteredPosts = posts.filter((product) =>
//     product.title.toLowerCase().includes(search.toLowerCase()) // Adjust 'title' if your field is different
//   );

//   return (
//     <div>
//       <Carousel />
//       <div className="bg-light py-1 min-vh-80" style={{ marginTop: '20px' }}>
//         <h1 className="text-center mb-1 fw-bold">Latest Posts</h1>
//         <div className="container" >
//           <div className="d-flex flex-wrap justify-content-center ">
//             {posts.length > 0 ? posts.map((product) => (
//               <Post key={product._id} product={product} />
//             )) : <h3>No Products available</h3>}
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default ProductList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/post';
import Carousel from '../carousel';
import './ProductList.css';
import './categories.css';

function ProductList({ search }) {
  const [posts, setPosts] = useState([]);

  // Fetch products
  const fetchPost = async () => {
    try {
      const response = await axios.get("https://e-commerce-xhdj.onrender.com/api/posts");
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
        <h1 className="section-title">Latest Posts</h1>
        <div className="page-container">
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
