import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "../components/post";

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