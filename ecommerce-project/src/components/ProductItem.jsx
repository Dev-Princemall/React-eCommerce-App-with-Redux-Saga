import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/actions";
import "../styles/productItem.css";
import { selectLoggedUsers } from "../redux/selectors";

const ProductItem = ({ product }) => {
  const user = useSelector(selectLoggedUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </Link>
      <div className="product-details">
        <div className="product-title">
          <p>{product.title}</p>
        </div>
        <div className="product-price-rating">
          <p className="product-price">₹{product.price.toFixed(2)}</p>
          <p className="product-rating">Rating: ⭐ {product.rating.rate}</p>
        </div>
        <div className="product-action-buttons">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button
            className="add-to-cart-button"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
