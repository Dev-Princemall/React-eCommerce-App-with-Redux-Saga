import React from "react";
import { useSelector } from "react-redux";
import "../styles/home.css";
import { selectLoggedUsers, selectUsers } from "../redux/selectors";
export default function Home() {
  const users = useSelector(selectUsers);
  const logged_user = useSelector(selectLoggedUsers);
  return (
    <div className="main-container">
      <h1>Home Page</h1>
    </div>
  );
}
