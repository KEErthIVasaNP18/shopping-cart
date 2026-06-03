import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './allcat.css'

const AllCategories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="all-categories-page page-container">
            <h2 className="categories-title">Explore Categories</h2>
            <div className="categories-grid">
                {categories.map((category) => (
                    <div key={category._id} className="category-col">
                        <Link to={`/category/${category._id}`} className="category-link">
                            <div className="category-card glass-card">
                                <div className="category-icon">
                                    <i className="bi bi-tags-fill"></i>
                                </div>
                                <h5 className="category-name">{category.Category}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCategories;
