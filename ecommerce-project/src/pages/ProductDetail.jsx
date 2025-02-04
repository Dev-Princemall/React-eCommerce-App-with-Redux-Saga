import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/ProductDetails.css";
import { addToCart } from "../Redux/actions";
import { selectProducts, selectLoggedUsers } from "../redux/selectors";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const products = useSelector(selectProducts);
  const [product, setProduct] = useState(null);
  const user = useSelector(selectLoggedUsers);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product, user.id));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const foundProduct = products.find(
      (item) => item.id === parseInt(productId)
    );
    setProduct(foundProduct);
  }, [productId, products]);

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
            <button onClick={handleAddToCart}>Add To Cart 🛒</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
