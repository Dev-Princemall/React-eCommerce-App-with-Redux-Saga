import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import "../styles/LoginSignUp.css";

export default function LoginSignUp() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  return (
    <div className="login-signup">
      <div className="main-container">
        <div className="info-container">
          <h2 className="info-title">Lorem Ipsum is simply</h2>
          <p className="info-text">Lorem Ipsum is simply</p>
        </div>
        <div className="form-container">
          <div className="form-wrapper">
            <div className="header-container">
              <h2 className="welcome-text">Welcome to</h2>
              <img
                src="./ecommerce.png"
                alt="logo"
                className="logo-image"
                style={{ objectFit: "contain", width: "100px", height: "50px" }}
              />
            </div>
            <div className="tab-container">
              <nav className="tab-navigation">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`tab-button ${isLogin ? "active" : ""}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`tab-button ${!isLogin ? "active" : ""}`}
                >
                  Register
                </button>
              </nav>
            </div>
            <div>{isLogin ? <LoginForm /> : <RegistrationForm />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
