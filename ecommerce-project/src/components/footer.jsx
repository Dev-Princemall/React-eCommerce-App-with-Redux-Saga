import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/cart" className="footer-link">
          Cart
        </Link>
        <Link to="/about" className="footer-link">
          About Us
        </Link>
      </div>

      <div className="footer-text">
        <p>&copy; 2025 Ecommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
