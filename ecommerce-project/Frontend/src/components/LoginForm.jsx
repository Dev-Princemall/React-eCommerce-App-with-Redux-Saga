import React, { useEffect, useState } from "react";
import { loginRequest } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthError, selectAuthToken } from "../redux/selectors";
import { toast } from "react-toastify";
import "../styles/AddUserForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const token = useSelector(selectAuthToken);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
    if (token) {
      toast.success("Login Successful.");
      setEmail("");
      setPassword("");
      navigate("/products");
    }
  }, [authError, token]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {/* {authError && <p style={{ color: "red" }}>{authError}</p>} */}
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
      <button type="submit">Login</button>
    </form>
  );
}
