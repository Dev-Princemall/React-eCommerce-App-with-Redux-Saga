import React, { useState } from "react";
import "../styles/AddUserForm.css";
import { loginUser } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.authError);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(name, password));
    setName("");
    setPassword("");
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}
