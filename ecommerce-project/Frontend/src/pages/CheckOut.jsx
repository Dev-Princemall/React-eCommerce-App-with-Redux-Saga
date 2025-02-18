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
  selectCart,
  selectLoggedUserDeliveryInfo,
  selectLoggedUserPaymentInfo,
  selectUserData,
} from "../redux/selectors";
import { fetchUserProfileRequest } from "../redux/actions";
import { placeOrder } from "../redux/order/actions";

export default function Checkout() {
  const userData = useSelector(selectUserData);
  const delivery_info = useSelector(selectLoggedUserDeliveryInfo);
  const payment_info = useSelector(selectLoggedUserPaymentInfo);
  const [totalAmount, setTotalAmount] = useState(0);
  const user_cart = useSelector(selectCart);
  const [paymentMethod, setPaymentMethod] = useState("pay on Delivery");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfileRequest());
  }, [dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleEditPayment = () => {
    setIsEditingPayment(true);
  };
  const handleFinish = () => {
    setIsEditing(false);
    dispatch(fetchUserProfileRequest());
  };
  const handleCheckOut = () => {
    if (!payment_info || !delivery_info) {
      toast.error("Please fill in your delivery and payment information");
      return;
    }
    const orderData = {
      items: user_cart,
      totalAmount,
      deliveryAddress: delivery_info,
      paymentMethod: JSON.stringify(payment_info),
    };
    console.log("Order Data:", orderData);
    dispatch(placeOrder(orderData));
  };
  const renderDeliveryInfo = () => {
    if (!delivery_info || isEditing)
      return <ShippingForm onFinish={handleFinish} />;

    return (
      <div className="delivery-info">
        <div className="delivery-address">
          <p>
            {delivery_info.houseNumber},{delivery_info.street},
            {delivery_info.landmark},{delivery_info.city},{delivery_info.state}-
            {delivery_info.postalCode},{delivery_info.country}{" "}
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
                ? `Shipping to ${userData?.fullName}`
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
                {console.log("Payment Method selected: ", paymentMethod)}
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
