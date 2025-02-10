import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchProductsRequest } from "../Redux/actions";
import {
  selectLoggedUsers,
  selectUsers,
  selectProducts,
} from "../redux/selectors";
import "../styles/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const logged_user = useSelector(selectLoggedUsers);
  const products = useSelector(selectProducts);
  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  // Settings for the carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Get featured products (first 6 products for example)
  const featuredProducts = products.slice(0, 6);
  const categories = [
    "electronics",
    "men's clothing",
    "women's clothing",
    "jewelery",
  ];

  return (
    <div className="home-main-container">
      <h1>Welcome to Our Store</h1>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Discover Amazing Products</h2>
          <p>Explore our curated collection of premium items</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="category-section">
        <h3>Shop by Category</h3>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category}`}
              key={category}
              className="category-card"
            >
              <div className="category-content">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <p>Explore collection</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="carousel-section">
        <h3>Featured Products</h3>
        <Slider {...carouselSettings}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="carousel-item">
              <img src={product.image} alt={product.title} />
              <div className="product-info">
                <h4>{product.title}</h4>
                <p>₹{product.price}</p>
                <Link to={`/products/${product.id}`} className="view-details">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <h3>Popular Collections</h3>
        <div className="collections-grid">
          <div className="collection-item electronics">
            <h4>Electronics</h4>
            <Link to="/products?category=electronics">Shop Now →</Link>
          </div>
          <div className="collection-item fashion">
            <h4>Jewellery</h4>
            <Link to="/products?category=jewelery">Shop Now →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
