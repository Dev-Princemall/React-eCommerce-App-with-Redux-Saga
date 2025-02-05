import React, { useEffect, useState } from "react";
import { clearErrorSuccessState, loginUser } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthError, selectSuccess } from "../redux/selectors";
import { toast } from "react-toastify";
import "../styles/AddUserForm.css";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const successMessage = useSelector(selectSuccess);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(name, password));
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);
      dispatch(clearErrorSuccessState());
    }
    if (successMessage) {
      toast.success("Login Successful.");
      setName("");
      setPassword("");
      dispatch(clearErrorSuccessState());
      navigate("/products");
    }
  }, [authError, successMessage, navigate, handleSubmit]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
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
