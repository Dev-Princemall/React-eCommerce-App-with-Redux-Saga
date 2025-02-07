import "../styles/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions";
import { selectLoggedUsers, selectLoggedUsersCart } from "../redux/selectors";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, AlertCircle, Plus, Minus } from "lucide-react";

export default function Cart() {
  const logged_user = useSelector(selectLoggedUsers);
  const cart = useSelector(selectLoggedUsersCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calculateSubtotal = () =>
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  const handleAdd = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  if (!logged_user) {
    return (
      <div className="login-required">
        <AlertCircle className="icon" />
        <h2>Login Required</h2>
        <p>Please login to view your cart.</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">
        <ShoppingCart className="icon" />
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>₹{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn-action"
                  >
                    <Minus className="icon" />
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="btn-action"
                  >
                    <Plus className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            {/* <div className="summary-item">
              <span>Subtotal:</span>
              <span>₹{calculateSubtotal()}</span>
            </div> */}
            {/* <div className="summary-item">
              <span>Shipping:</span>
              <span className="free">Free</span>
            </div> */}
            <div className="summary-total">
              <span>Subtotal ({cart.length} items):</span>
              <span>₹{calculateSubtotal()}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate("/cart/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
