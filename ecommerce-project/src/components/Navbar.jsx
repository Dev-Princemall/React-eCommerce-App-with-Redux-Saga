import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaCog, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/actions";
import "../styles/navbar.css";

export default function Navbar() {
  const location = useLocation();
  const logged_user = useSelector((state) => state.logged_user);
  const cartCount = useSelector((state) =>
    logged_user ? state.carts[logged_user.id]?.cartItems.length || 0 : 0
  );
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setDropdownVisible(true);
  const handleMouseLeave = () => setDropdownVisible(false);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Ecommerce</a>
      </div>
      <ul className="navbar-links">
        {/* <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li> */}
        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={location.pathname === "/products" ? "active" : ""}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
          >
            Contact
          </Link>
        </li>
      </ul>
      <ul className="icons">
        <li className="cart-link">
          <Link
            to="/cart"
            className={location.pathname === "/cart" ? "active" : ""}
          >
            <FaShoppingCart className="cart-icon" size={24} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
        {logged_user ? (
          <li
            className="user-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/user">
              <FaUser size={24} color="white" />
            </Link>
            {isDropdownVisible && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/user/settings" className="dropdown-item">
                      <FaCog size={18} /> Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item">
                      <FaSignOutAlt size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link
              to="/signup"
              className={location.pathname === "/signup" ? "active" : ""}
            >
              SignUp
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
