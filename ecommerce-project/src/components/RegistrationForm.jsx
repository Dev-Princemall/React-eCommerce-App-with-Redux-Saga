import React, { useState } from "react";
import "../styles/AddUserForm.css";
import { addUser } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.authError);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(null);
      setTimeout(() => setError("Password do not match!"), 0);
      return;
    } else {
      setError(null);
    }
    const newUser = {
      id: Date.now(),
      name: name,
      password: password,
    };
    dispatch(addUser(newUser));
    setName("");
    setPassword("");
    setConfirmPassword("");
    navigate("/login");
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p className={"error-message"}>{error}</p>}
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your username"
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
      <button type="submit">Sign Up</button>
    </form>
  );
}
