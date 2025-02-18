import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeliveryInfo,
  editDeliveryInfo,
  updateUserProfileRequest,
} from "../redux/actions";
import {
  selectAuthError,
  selectAuthSuccess,
  selectLoggedUser,
  selectLoggedUserDeliveryInfo,
} from "../redux/selectors";

export default function ShippingForm({ onFinish }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const error = useSelector(selectAuthError);
  const successMsg = useSelector(selectAuthSuccess);
  const user = useSelector(selectLoggedUser);
  const existingDeliveryInfo = useSelector(selectLoggedUserDeliveryInfo);
  console.log("EXISTING DELIVERY INFO", existingDeliveryInfo);
  const [formData, setFormData] = useState({
    country: "",
    fullName: "",
    phoneNumber: "",
    postalCode: "",
    houseNumber: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (existingDeliveryInfo) {
      setFormData((prevForm) => ({
        ...prevForm,
        country: user?.address?.country,
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        postalCode: user?.address?.postalCode,
        houseNumber: user?.address?.houseNumber,
        street: user?.address?.street,
        landmark: user?.address?.landmark,
        city: user?.address?.city,
        state: user?.address?.state,
      }));
      console.log("After setting form data:", formData);
    }
  }, [existingDeliveryInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateUserProfileRequest(formData));
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    if (isFormSubmitted && successMsg) {
      setLoading(false);
      if (onFinish) onFinish();
    }
  }, [successMsg, isFormSubmitted]);

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
          <label htmlFor="phoneNumber">Mobile number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="postalCode">postalCode</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="houseNumber">
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            required
            value={formData.houseNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="street">street, Street, Sector, Village</label>
          <input
            type="text"
            id="street"
            name="street"
            required
            value={formData.street}
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
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        type="submit"
        className="shipping-form-add-info-btn"
        disabled={loading}
      >
        {loading
          ? "Updating..."
          : existingDeliveryInfo
          ? "Update Info"
          : "Add Info"}
      </button>
    </form>
  );
}
