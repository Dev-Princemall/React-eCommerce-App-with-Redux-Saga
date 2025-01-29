import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/actions";
export default function Navbar() {
  const logged_user = useSelector((state) => state.logged_user);
  const dispatch = useDispatch();

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="">Ecommerce</a>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/products">Contact</Link>
        </li>
      </ul>
      <ul className="icons">
        <li>
          <Link to="/cart">Cart</Link>
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
            <Link to="/signup">SignUp</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
