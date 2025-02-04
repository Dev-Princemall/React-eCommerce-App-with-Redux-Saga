import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/cart";
import LoginSignUp from "./pages/LoginSignUp";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/footer";

export default function Routing() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<Cart />} />
        <Route path="/signup" element={<LoginSignUp login={false} />} />
        <Route path="/login" element={<LoginSignUp login={true} />} />
        <Route path="/logout" />
      </Routes>
      <Footer />
    </Router>
  );
}
