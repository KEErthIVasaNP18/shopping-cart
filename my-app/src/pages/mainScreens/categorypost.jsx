import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Post from "../../components/post/post";
import "./categories.css";

function CategoryPost() {
    const [category, setCategory] = useState([])
    const [posts, setPosts] = useState([])
    const { id } = useParams()




    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axios.get(`http://localhost:5500/api/categories/${id}`);
            setCategory(response.data);
        };

        const fetchPost = async () => {
            const response = await axios.get(`http://localhost:5500/api/posts/category/${id}`);
            setPosts(response.data);
        };

        fetchCategory();
        fetchPost();
    }, [id]);



    if (!category) {
        return <p>Loading ...</p>
    }


    return (

        <div className="category-post-page page-container">
            <div className="category-post-content glass-card">
                <div className="category-header">
                    <Link to="/posts/categories" className="back-link">
                        <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Categories
                    </Link>
                    <h4 className="category-subtitle">Categories</h4>
                    <h1 className="category-title">{category.Category}</h1>
                </div>

                {posts.length > 0 ? (
                    <div className="product-grid">
                        {posts.map((product) => (
                            <Post key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <h3 className="no-products-msg">No Products available</h3>
                )}
            </div>
        </div>

    )
}

export default CategoryPost;