import React from "react";
import { useSelector } from "react-redux";
import "../styles/home.css";
export default function Home() {
  const users = useSelector((state) => state.users);
  const logged_user = useSelector((state) => state.logged_user);
  return (
    <div className="main-container">
      <h1>Home Page</h1>
    </div>
  );
}
