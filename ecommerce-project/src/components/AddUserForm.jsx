import React, { useState } from "react";
import "../styles/AddUserForm.css";
import { addUser } from "../Redux/actions";
import { useDispatch } from "react-redux";

export default function AddUserForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(null);
      setTimeout(() => setError("Password do not match!"), 0);
      return;
    } else {
      setError(null);
      alert("User registered successfully!");
    }

    const newUser = {
      name: name,
      password: password,
    };
    dispatch(addUser(newUser));
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p className={"error-message"}>{error}</p>}
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
