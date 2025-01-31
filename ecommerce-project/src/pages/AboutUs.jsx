import React from "react";
import "../styles/aboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <h1>About Us</h1>
        <p>Discover our journey and what makes us unique.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            We are a passionate team dedicated to bringing you the best online
            shopping experience. Our mission is to provide high-quality
            products, excellent customer service, and a seamless shopping
            experience.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our goal is to offer a wide range of quality products at affordable
            prices. We believe in customer satisfaction and work tirelessly to
            meet your needs.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔️ High-quality products</li>
            <li>✔️ Fast and secure shipping</li>
            <li>✔️ 24/7 customer support</li>
            <li>✔️ Easy returns and refunds</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
