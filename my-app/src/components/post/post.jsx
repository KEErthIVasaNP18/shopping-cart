import { Link } from "react-router-dom";
import './post.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Post({ product }) {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);

    const isInWishlist = wishlistItems.some(item => item._id === product._id);

    const toggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    return (
        <div className="product-card" data-aos="fade-up">
            <div className="product-image-container">
                <img
                    src={product.Img}
                    alt="Product"
                    className="product-card-img"
                />
                <button
                    className={`wishlist-icon-btn ${isInWishlist ? 'active' : ''}`}
                    onClick={toggleWishlist}
                    title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                    {isInWishlist ? <FaHeart className="heart-filled" /> : <FaRegHeart className="heart-outline" />}
                </button>
            </div>

            <div className="product-card-body">
                <h5 className="product-card-title">{product.Name}</h5>
                <p className="product-card-text">
                    <strong>About :</strong> {product.About?.length > 25 ? product.About.slice(0, 25) + '...' : product.About}
                </p>
                <p className="product-card-price">₹{product.Price}</p>

                <div className="product-card-actions">
                    <Link to={`/posts/${product._id}`} className="flex-1">
                        <button className="btn btn-read-more">
                            Read More
                        </button>
                    </Link>

                    <button
                        className="btn btn-add-cart flex-1"
                        onClick={() => dispatch(addToCart(product))}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;