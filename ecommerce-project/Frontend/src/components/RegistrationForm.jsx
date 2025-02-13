import React, { useEffect, useState } from "react";
import "../styles/AddUserForm.css";
import { registerRequest } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthError, selectAuthToken } from "../redux/selectors";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector(selectAuthError);
  const token = useSelector(selectAuthToken);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(null);

    dispatch(registerRequest({ email, password })); // Fixed payload
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
    if (token) {
      // Clear form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login"); // Navigate immediately after successful registration
    }
  }, [authError, token, navigate]); // Fixed dependencies

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {authError && <p className="error-message">{authError}</p>}

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
        required
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />

      <label>Confirm Password:</label>
      <input
        type="password"
        name="confirm_password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        required
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
