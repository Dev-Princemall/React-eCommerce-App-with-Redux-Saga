import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDeliveryInfo, editDeliveryInfo } from "../redux/actions";
import { selectLoggedUserDeliveryInfo } from "../redux/selectors";

export default function ShippingForm({ onFinish }) {
  const dispatch = useDispatch();
  const existingDeliveryInfo = useSelector(selectLoggedUserDeliveryInfo);

  const [formData, setFormData] = useState({
    country: "",
    fullName: "",
    mobileNo: "",
    pinCode: "",
    houseNameNumber: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (existingDeliveryInfo) {
      setFormData(existingDeliveryInfo);
    }
  }, [existingDeliveryInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingDeliveryInfo) {
      dispatch(editDeliveryInfo(formData));
    } else {
      dispatch(addDeliveryInfo(formData));
    }
    if (onFinish) onFinish();
  };

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="India">India</option>
            <option value="Canada">Canada</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile number</label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            required
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pinCode">PinCode</label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            required
            value={formData.pinCode}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="houseNameNumber">
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            type="text"
            id="houseNameNumber"
            name="houseNameNumber"
            required
            value={formData.houseNameNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="area">Area, Street, Sector, Village</label>
          <input
            type="text"
            id="area"
            name="area"
            required
            value={formData.area}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            required
            value={formData.landmark}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">Town/City</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="shipping-form-add-info-btn">
        {existingDeliveryInfo ? "Update Info" : "Add Info"}
      </button>
    </form>
  );
}
