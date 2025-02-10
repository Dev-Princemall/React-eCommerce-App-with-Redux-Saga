import React, { useEffect } from "react";
import { selectLoggedUsersCart } from "../redux/selectors";
import { useSelector } from "react-redux";

export const CheckOutSummary = ({ setTotalAmount }) => {
  const cart = useSelector(selectLoggedUsersCart);
  const shippingCharge = 100;
  const taxPercentage = 18;

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const subtotal = parseFloat(calculateSubtotal());
  const taxAmount = ((subtotal * taxPercentage) / 100).toFixed(2);
  const discount = shippingCharge;
  const total = (
    subtotal +
    parseFloat(taxAmount) +
    shippingCharge -
    discount
  ).toFixed(2);

  useEffect(() => {
    setTotalAmount(parseFloat(total));
  }, [total, setTotalAmount]);

  return (
    <div>
      <h2>Order Total</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>₹{shippingCharge}</span>
      </div>
      <div className="summary-row">
        <span>Tax ({taxPercentage}%)</span>
        <span>₹{taxAmount}</span>
      </div>
      <div className="summary-row">
        <span>Discount</span>
        <span>- ₹{discount}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};
