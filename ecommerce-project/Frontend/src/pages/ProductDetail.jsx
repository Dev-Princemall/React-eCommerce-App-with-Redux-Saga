import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCartRequest } from "../Redux/actions";
import {
  selectProducts,
  selectAuthToken,
  selectCart,
} from "../redux/selectors";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const products = useSelector(selectProducts);
  const [product, setProduct] = useState(null);
  const success = useSelector(selectCartSuccess);
  const token = useSelector(selectAuthToken);
  const userCart = useSelector(selectCart);
  const dispatch = useDispatch();

  const isAlreadyAdded = userCart.some((item) => item._id === productId);

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    setProduct(foundProduct);
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please Login to Add Item to Cart");
      navigate("/login");
      return;
    }
    dispatch(addToCartRequest(product));
  };
  useEffect(() => {
    if (success) {
      toast.success("Item Added to Cart Successfully");
    }
  }, [success]);

  if (!product)
    return (
      <p className="product-details-wrapper loading">
        Loading product details...
      </p>
    );

  return (
    <div className="product-details-wrapper">
      <div className="product-details-container">
        <h1 className="product-details-title">{product.title}</h1>
        <div className="product-details-section">
          <img
            src={product.image}
            alt={product.title}
            className="product-details-image"
          />
          <div className="product-details-info">
            <p className="product-details-description">{product.description}</p>
            {product.brand && (
              <p className="product-details-brand">
                <strong>Brand:</strong> {product.brand}
              </p>
            )}
            <p className="product-details-price">
              <strong>Price:</strong> ₹{product.price.toFixed(2)}
            </p>
            <p className="product-details-category">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="product-details-rating">
              <strong>Rating:</strong> ⭐ {product.rating.rate} (
              {product.rating.count})
            </p>
            <button
              className={
                isAlreadyAdded
                  ? "add-to-cart-detailsPage-button-disabled"
                  : "add-to-cart-detailsPage-button"
              }
              onClick={handleAddToCart}
              disabled={isAlreadyAdded}
            >
              {isAlreadyAdded ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
