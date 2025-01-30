import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/actions";
import "../styles/cart.css";

export default function Cart() {
  const logged_user = useSelector((state) => state.logged_user);
  const cart = useSelector((state) => {
    if (logged_user) {
      return state.carts[logged_user.id]?.cartItems || [];
    }
    return [];
  });

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

  return (
    <div className="cart-container">
      {!logged_user ? (
        <div className="login-warning">Please login to use this feature.</div>
      ) : (
        <>
          <h1 className="cart-title">Your Cart</h1>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="cart-item-image"
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <button
                          onClick={() => handleAdd(item)}
                          className="btn-add"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="btn-remove"
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-item">
                  <span>Subtotal:</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping:</span>
                  <span className="free">Free</span>
                </div>
                <div className="summary-total">
                  <span>Total:</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
