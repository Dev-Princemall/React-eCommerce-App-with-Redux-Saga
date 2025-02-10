import React from "react";
import Routing from "./Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} />
      <Routing />
    </div>
  );
};

export default App;
