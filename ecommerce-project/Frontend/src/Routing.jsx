import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/cart";
import LoginSignUp from "./pages/LoginSignUp";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/ProductDetail";
import CheckOut from "./pages/CheckOut";
import OrderHistory from "./pages/OrderHistory";
import AboutUs from "./pages/AboutUs";
import { PageNotFound } from "./pages/PageNotFound";
import Footer from "./components/footer";

export default function Routing() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<CheckOut />} />
        <Route path="/user" element={<Cart />} />
        <Route path="/user/order-history" element={<OrderHistory />} />
        <Route path="/signup" element={<LoginSignUp islogin={false} />} />
        <Route path="/login" element={<LoginSignUp islogin={true} />} />
        <Route path="/logout" />
        <Route path="*" element={<>404 Page Not Found</>} />
      </Routes>
      <Footer />
    </Router>
  );
}
