import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const users = useSelector((state) => state.users);
  const logged_user = useSelector((state) => state.logged_user);
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        Users List:
        {console.log("User List:", users)}
        {users &&
          users.map((user) => (
            <li key={user.id}>
              id: {user.id} | Name: {user.name} | Password: {user.password}
            </li>
          ))}
      </ul>
      <h2>
        Logged In user: {logged_user && logged_user.name}
        {console.log("Logged User:", logged_user)}
      </h2>
    </div>
  );
}
