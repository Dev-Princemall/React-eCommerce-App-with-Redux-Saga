import React, { useEffect, useState } from "react";
import "../styles/AddUserForm.css";
import { addUser, clearErrorSuccessState } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthError, selectSuccess } from "../redux/selectors";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const successMessage = useSelector(selectSuccess);
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
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
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);
      dispatch(clearErrorSuccessState());
    }
    if (successMessage) {
      toast.success(successMessage);
      setName("");
      setPassword("");
      dispatch(clearErrorSuccessState());
      navigate("/login");
    }
  }, [authError, successMessage]);

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
      <label>Confirm Password:</label>
      <input
        type="password"
        name="confirm_password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        required
      />
      {error && <p className={"error-message"}>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
