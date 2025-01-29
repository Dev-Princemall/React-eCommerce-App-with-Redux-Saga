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
              <div className="cart-list">
                {console.log(cart)}
                {cart.map((item) => (
                  <div className="cart-item-card" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.title}</h3>
                      <p className="cart-item-description">
                        {item.description.slice(0, 60)}...
                      </p>
                      <p className="cart-item-price">Price: ${item.price}</p>
                      <p className="cart-item-quantity">
                        Quantity: {item.quantity}
                      </p>
                      <div className="cart-item-actions">
                        <button onClick={() => handleAdd(item)}>+</button>
                        <button onClick={() => handleRemove(item.id)}>-</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <h2>Cart Summary</h2>
                <p>Subtotal: ${calculateSubtotal()}</p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
