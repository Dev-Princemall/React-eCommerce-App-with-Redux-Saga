import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../Redux/actions";
import "../styles/productItem.css";
import { selectLoggedUsers } from "../redux/selectors";

const ProductItem = ({ product }) => {
  const user = useSelector(selectLoggedUsers);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product, user.id));
    } else {
      alert("Please log in to add items to the cart.");
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
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">₹{(product.price * 15).toFixed(2)}</p>
        <p className="product-rating">Rating: ⭐ {product.rating.rate}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
