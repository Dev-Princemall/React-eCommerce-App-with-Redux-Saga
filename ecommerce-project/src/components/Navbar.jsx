import React, { useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/actions";
import { selectCartCount, selectLoggedUsers } from "../redux/selectors";
import "../styles/navbar.css";

export default function Navbar() {
  const location = useLocation();
  const logged_user = useSelector(selectLoggedUsers);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const cartCount = useSelector(selectCartCount);
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
        <Link to="/">Ecommerce</Link>
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
        <li>
          <div
            className={`search-container ${isSearchVisible ? "active" : ""}`}
          >
            <FaSearch
              size={25}
              className="search-icon"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            />
            <input
              type="search"
              placeholder="Search..."
              className="search-input"
            />
          </div>
        </li>
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
