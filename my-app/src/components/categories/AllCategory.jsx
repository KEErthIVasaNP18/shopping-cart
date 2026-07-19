import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTshirt, FaFemale, FaChild, FaLaptop, FaTags } from "react-icons/fa";
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

    const getCategoryIcon = (categoryName) => {
        if (!categoryName) return <FaTags />;
        const name = categoryName.toLowerCase();
        if (name === "men" || name.includes("mens")) return <FaTshirt />;
        if (name.includes("women")) return <FaFemale />;
        if (name.includes("kid")) return <FaChild />;
        if (name.includes("electronic")) return <FaLaptop />;
        return <FaTags />;
    };
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
                                    {getCategoryIcon(category.Category)}
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
