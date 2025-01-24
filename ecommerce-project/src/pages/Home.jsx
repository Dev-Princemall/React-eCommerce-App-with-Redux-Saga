import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Welcome {users}</h2>
      {console.log(users)}
    </div>
  );
}
