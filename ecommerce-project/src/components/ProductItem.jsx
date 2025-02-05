import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/actions";
import { toast } from "react-toastify";
import "../styles/productItem.css";
import { selectLoggedUsers, selectLoggedUsersCart } from "../redux/selectors";

const ProductItem = ({ product }) => {
  const user = useSelector(selectLoggedUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userCart = useSelector(selectLoggedUsersCart);

  const isAlreadyAdded = userCart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product));
      toast.success("Item Added to Cart Successfully");
    } else {
      navigate("/login");
      toast.error("Please Login to Add Item to Cart");
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
