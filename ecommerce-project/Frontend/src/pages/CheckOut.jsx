import { useEffect, useState } from "react";
import { ShoppingBag, Truck, CreditCard, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import { toast } from "react-toastify";
import "../styles/CheckOut.css";
import { CheckOutSummary } from "../components/CheckOutSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedUserDeliveryInfo,
  selectLoggedUserPaymentInfo,
  selectLoggedUsersCart,
} from "../redux/selectors";
import { addOrderHistory, clearCart } from "../redux/actions";

export default function Checkout() {
  const delivery_info = useSelector(selectLoggedUserDeliveryInfo);
  const payment_info = useSelector(selectLoggedUserPaymentInfo);
  const [totalAmount, setTotalAmount] = useState(0);
  const user_cart = useSelector(selectLoggedUsersCart);
  const [paymentMethod, setPaymentMethod] = useState("pay on Delivery");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("delivery_info:", delivery_info);
    console.log("payment_info:", payment_info);
  }, [delivery_info, payment_info]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleEditPayment = () => {
    setIsEditingPayment(true);
  };

  const handleCheckOut = () => {
    if (!payment_info || !delivery_info) {
      toast.error("Please fill in your delivery and payment information");
      return;
    }
    if (payment_info.method === "Pay on Delivery") {
      dispatch(clearCart());
      toast.success("Order placed successfully");
      navigate("/");
    } else if (payment_info.method === "UPI") {
      dispatch(clearCart());
      toast.success("Order placed successfully");
      navigate("/");
    } else if (payment_info.method === "Net Banking") {
      dispatch(clearCart());
      toast.success("Order placed successfully");
      navigate("/");
    } else if (payment_info.method === "Credit/Debit Card") {
      dispatch(clearCart());
      toast.success("Order placed successfully");
      navigate("/");
    }
    dispatch(
      addOrderHistory(user_cart, delivery_info, payment_info, totalAmount)
    );
  };
  const renderDeliveryInfo = () => {
    if (!delivery_info || isEditing)
      return <ShippingForm onFinish={() => setIsEditing(false)} />;

    return (
      <div className="delivery-info">
        <div className="delivery-address">
          <p>
            {delivery_info.houseNameNumber},{delivery_info.area},
            {delivery_info.landmark},{delivery_info.city},{delivery_info.state}-
            {delivery_info.pinCode},{delivery_info.country}{" "}
          </p>
        </div>
        <Edit className="icon editIcon" onClick={handleEdit} />
      </div>
    );
  };

  const renderPaymentOptions = () => {
    const paymentOptions = [
      "Pay on Delivery",
      "UPI",
      "Net Banking",
      "Credit/Debit Card",
    ];

    return (
      <>
        {paymentOptions.map((method) => (
          <button
            key={method}
            className={`payment-option ${
              paymentMethod === method ? "active" : ""
            }`}
            onClick={() => setPaymentMethod(method)}
          >
            {method.replace("-", " ").toUpperCase()}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-forms">
          {/* Shipping Section */}
          <section className="checkout-section">
            <h2>
              <Truck className="icon" />{" "}
              {delivery_info
                ? `Shipping to ${delivery_info?.fullName}`
                : "Add Shipping Information"}
            </h2>
            {renderDeliveryInfo()}
          </section>

          {/* Payment Section */}
          <section className="checkout-section">
            <h2>
              <CreditCard className="icon" />{" "}
              {payment_info
                ? `Paying with ${payment_info?.method}`
                : "Payment Method"}
            </h2>
            {!payment_info || isEditingPayment ? (
              <>
                <div className="payment-options">{renderPaymentOptions()}</div>
                <PaymentForm
                  paymentMethod={paymentMethod}
                  onFinish={() => setIsEditingPayment(false)}
                />
              </>
            ) : (
              <div className="editIcon-payment">
                <Edit className="icon editIcon" onClick={handleEditPayment} />
              </div>
            )}
          </section>

          {/* Order Summary */}
          <section className="checkout-section">
            <h2>
              <ShoppingBag className="icon" /> Order Summary
            </h2>
            <OrderSummary />
          </section>
        </div>
        <div className="checkout-summary">
          <CheckOutSummary setTotalAmount={setTotalAmount} />
          <button className="checkout-button" onClick={handleCheckOut}>
            Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
}
