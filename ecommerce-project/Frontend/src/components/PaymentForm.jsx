import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentInfo } from "../redux/actions";
import { selectLoggedUserPaymentInfo } from "../redux/selectors";

export default function PaymentForm({ paymentMethod, onFinish }) {
  const dispatch = useDispatch();
  const existingPaymentDetail = useSelector(selectLoggedUserPaymentInfo);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    upiID: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    netBanking: "",
  });
  useEffect(() => {
    setError(null);
  }, [paymentMethod]);
  useEffect(() => {
    if (existingPaymentDetail) {
      setFormData(existingPaymentDetail);
    }
  }, [existingPaymentDetail]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("AT HANDLE SUBMIT", formData);
    if (paymentMethod === "UPI") {
      const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
      if (!upiRegex.test(formData.upiID)) {
        setError("Invalid UPI ID. Format should be username@bankname");
        return;
      }
      dispatch(savePaymentInfo({ method: "UPI", upiID: formData.upiID }));
      setError(null);
    } else if (paymentMethod === "Credit/Debit Card") {
      const { cardNumber, expiryDate, cvv, nameOnCard } = formData;
      if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
        setError("Please fill all card details.");
        return;
      }
      dispatch(savePaymentInfo({ method: "Credit Card", ...formData }));
      setError(null);
    } else if (paymentMethod === "Net Banking") {
      if (!formData.netBanking) {
        setError("Please select a bank.");
        return;
      }
      dispatch(
        savePaymentInfo({ method: "Net Banking", bank: formData.netBanking })
      );
      setError(null);
    } else if (paymentMethod === "Pay on Delivery") {
      dispatch(savePaymentInfo({ method: "Pay on Delivery" }));
      console.log(" In store payment info", existingPaymentDetail);
    }
    if (onFinish) onFinish();
  };

  return (
    <div className="payment-form">
      {paymentMethod === "Credit/Debit Card" && (
        <div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="nameOnCard">Name on Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              required
              onChange={handleChange}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="button"
            className="payment-select-button"
            onClick={handleSubmit}
          >
            Use this payment method
          </button>
        </div>
      )}
      {paymentMethod === "UPI" && (
        <div className="form-group upi">
          <label htmlFor="upi">Enter UPI ID</label>
          <div className="input-group">
            <input
              type="text"
              id="upi"
              name="upiID"
              placeholder="username@bankname"
              required
              onChange={handleChange}
            />
            <button className="verify-button" onClick={handleSubmit}>
              Verify & Save
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
      {paymentMethod === "Net Banking" && (
        <div>
          <div className="form-group">
            <label htmlFor="netBanking">Select Your Bank</label>
            <select
              name="netBanking"
              id="netBanking"
              required
              onChange={handleChange}
            >
              <option value="">-- Choose Bank --</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="button"
            className="payment-select-button"
            onClick={handleSubmit}
          >
            Use this payment method
          </button>
        </div>
      )}
      {paymentMethod === "Pay on Delivery" && (
        <div>
          <p>You can pay in cash or via card upon delivery.</p>
          <button
            type="button"
            className="payment-select-button"
            onClick={handleSubmit}
          >
            Use this payment method
          </button>
        </div>
      )}
    </div>
  );
}
