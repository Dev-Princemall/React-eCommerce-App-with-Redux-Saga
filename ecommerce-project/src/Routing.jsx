import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/cart";
import LoginSignUp from "./pages/LoginSignUp";
export default function Routing() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<Cart />} />
        <Route path="/signup" element={<LoginSignUp />} />
      </Routes>
    </Router>
  );
}
