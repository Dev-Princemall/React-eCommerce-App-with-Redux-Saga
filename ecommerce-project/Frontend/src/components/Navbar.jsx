import React, { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaShoppingCart,
  FaSearch,
  FaHistory,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/actions";
import {
  selectCartCount,
  selectLoggedUser,
  selectProducts,
} from "../redux/selectors";
import "../styles/navbar.css";
import { toast } from "react-toastify";

export default function Navbar() {
  const location = useLocation();
  const logged_user = useSelector(selectLoggedUser);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const searchRef = useRef(null);

  const handleMouseEnter = () => setDropdownVisible(true);
  const handleMouseLeave = () => setDropdownVisible(false);

  const handleLogout = () => {
    setDropdownVisible(false);
    dispatch(logout());
    navigate("/login");
    toast.success("Logged Out Successfully.");
  };

  // useEffect(() => {
  //   if (!logged_user) {
  //     navigate("/login");
  //   }
  // }, [logged_user, navigate]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearchResults(
        searchQuery
          ? products.filter((product) =>
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : []
      );
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, products]);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="./ecommerce.png" alt="logo" />
        </Link>
      </div>
      <ul className="navbar-links">
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
            ref={searchRef}
            className={`search-container ${isSearchVisible ? "active" : ""}`}
          >
            <FaSearch
              size={24}
              className="search-icon"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            />
            <input
              type="search"
              placeholder="Search..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchVisible(true)}
            />
            {searchQuery && isSearchVisible && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      to={`/products/${product.id}`}
                      key={product.id}
                      className="search-result-item"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="result-product-image"
                        />
                      )}
                      <div className="product-details">
                        <div className="product-name">{product.title}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="no-results">No results found</div>
                )}
              </div>
            )}
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
                  {/* <li>
                    <Link to="/user/settings" className="dropdown-item">
                      <FaCog size={18} /> Settings
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/user/order-history" className="dropdown-item">
                      <FaHistory size={18} /> Order History
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
