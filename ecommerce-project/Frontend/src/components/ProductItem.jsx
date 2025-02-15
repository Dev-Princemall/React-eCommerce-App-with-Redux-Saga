import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCartRequest } from "../Redux/actions";
import { toast } from "react-toastify";
import StarDistribution from "./StarDistribution";
import { selectCart, selectLoggedUser } from "../redux/selectors";
import "../styles/productItem.css";

const ProductItem = ({ product }) => {
  const [showDistribution, setShowDistribution] = useState(false);
  const user = useSelector(selectLoggedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userCart = useSelector(selectCart) ?? { cart: { items: [] } };

  const isAlreadyAdded =
    userCart?.items?.some((item) => item.productId._id === product._id) ||
    false;

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCartRequest(product._id, user._id));
      toast.success("Item Added to Cart Successfully");
    } else {
      navigate("/login");
      toast.error("Please Login to Add Item to Cart");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
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
          <div
            className="rating-container"
            onMouseEnter={() => setShowDistribution(true)}
            onMouseLeave={() => setShowDistribution(false)}
          >
            <p className="product-rating">⭐ {product.rating.rate}</p>
            {showDistribution && (
              <div className="rating-distribution-container">
                <StarDistribution
                  rate={product.rating.rate}
                  count={product.rating.count}
                />
              </div>
            )}
          </div>
        </div>
        <div className="product-action-buttons">
          <button
            className={
              isAlreadyAdded
                ? "add-to-cart-button-disabled"
                : "add-to-cart-button"
            }
            onClick={handleAddToCart}
            disabled={isAlreadyAdded}
          >
            {isAlreadyAdded ? "Added to Cart" : "Add to Cart"}
          </button>
          <button
            className="view-detail-button"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
