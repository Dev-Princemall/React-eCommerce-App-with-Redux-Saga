import React, { useEffect } from "react";
import Routing from "./Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "./redux/selectors";
import { getCartRequest } from "./redux/actions";
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser);
  useEffect(() => {
    if (user?._id) {
      dispatch(getCartRequest(user._id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} />
      <Routing />
    </div>
  );
};

export default App;
