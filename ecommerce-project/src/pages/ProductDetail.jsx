import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "../styles/ProductDetails.css";
import { addToCart } from "../Redux/actions";
import {
  selectProducts,
  selectLoggedUsers,
  selectLoggedUsersCart,
} from "../redux/selectors";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const products = useSelector(selectProducts);
  const [product, setProduct] = useState(null);
  const user = useSelector(selectLoggedUsers);
  const userCart = useSelector(selectLoggedUsersCart);
  const dispatch = useDispatch();

  // Convert productId to a number for proper comparison
  const numericProductId = parseInt(productId, 10);
  const isAlreadyAdded = userCart.some((item) => item.id === numericProductId);

  useEffect(() => {
    const foundProduct = products.find((item) => item.id === numericProductId);
    setProduct(foundProduct);
  }, [numericProductId, products]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please Login to Add Item to Cart");
      navigate("/login");
      return;
    }

    if (product) {
      dispatch(addToCart(product));
      toast.success("Item Added to Cart Successfully");
    }
  };

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
