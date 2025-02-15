// import "../styles/cart.css";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCart, addToCartAPI, removeFromCartAPI } from "../redux/actions";
// import { selectLoggedUser, selectLoggedUsersCart } from "../redux/selectors";
// import { useNavigate } from "react-router-dom";
// import { ShoppingCart, AlertCircle, Plus, Minus, Trash2 } from "lucide-react";

// export default function Cart() {
//   const logged_user = useSelector(selectLoggedUser);
//   const cart = useSelector(selectLoggedUsersCart);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Fetch cart from backend when component mounts
//   useEffect(() => {
//     if (logged_user) {
//       dispatch(fetchCart(logged_user.id)); // Fetch cart for logged-in user
//     }
//   }, [dispatch, logged_user]);

//   const calculateSubtotal = () =>
//     cart
//       .reduce((total, item) => total + item.price * item.quantity, 0)
//       .toFixed(2);

//   const handleAdd = (item) => {
//     dispatch(addToCartAPI(item)); // API call to update backend
//   };

//   const handleRemove = (itemId) => {
//     dispatch(removeFromCartAPI(itemId)); // API call to update backend
//   };

//   if (!logged_user) {
//     return (
//       <div className="login-required">
//         <AlertCircle className="icon" />
//         <h2>Login Required</h2>
//         <p>Please login to view your cart.</p>
//         <button onClick={() => navigate("/login")}>Go to Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <h1 className="cart-title">
//         <ShoppingCart className="icon" />
//         Your Cart
//       </h1>
//       {cart.length === 0 ? (
//         <p className="empty-cart">Your cart is empty.</p>
//       ) : (
//         <div className="cart-products">
//           <div className="cart-items">
//             {cart.map((item) => (
//               <div key={item.id} className="cart-item">
//                 <img
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.title}
//                   className="cart-item-image"
//                 />
//                 <div className="cart-item-details">
//                   <h3>{item.title}</h3>
//                   <p>₹{item.price}</p>
//                 </div>
//                 <div className="cart-item-actions">
//                   <button
//                     onClick={() => handleRemove(item.id)}
//                     className="btn-action"
//                   >
//                     {item.quantity === 1 ? (
//                       <Trash2 className="icon" />
//                     ) : (
//                       <Minus className="icon" />
//                     )}
//                   </button>
//                   <span className="item-quantity">{item.quantity}</span>
//                   <button
//                     onClick={() => handleAdd(item)}
//                     className="btn-action"
//                   >
//                     <Plus className="icon" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="cart-summary">
//             <div className="summary-total">
//               <span>Subtotal ({cart.length} items):</span>
//               <span>₹{calculateSubtotal()}</span>
//             </div>
//             <button
//               className="checkout-btn"
//               onClick={() => navigate("/cart/checkout")}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import "../styles/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addToCartRequest,
  decreaseQuantityRequest,
  removeCartItemRequest,
  getCartRequest,
} from "../redux/actions";
import { selectCart } from "../redux/selectors";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, AlertCircle, Plus, Minus, Trash2 } from "lucide-react";

export default function Cart() {
  const userId = useSelector((state) => state.auth.user?._id);
  const cart = useSelector(selectCart) ?? { cart: { items: [] } };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch the cart when the page loads
  useEffect(() => {
    if (userId) {
      dispatch(getCartRequest(userId));
    }
  }, [userId, dispatch]);

  // Calculate cart subtotal
  const calculateSubtotal = () =>
    cart?.items
      ?.reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);

  // Cart actions
  const handleAdd = (productId) => {
    dispatch(addToCartRequest(userId, productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItemRequest(productId, userId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantityRequest(userId, productId));
  };

  if (!userId) {
    return (
      <div className="login-required">
        <AlertCircle className="icon" />
        <h2>Login Required</h2>
        <p>Please login to view your cart.</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">
        <ShoppingCart className="icon" />
        Your Cart
      </h1>
      {cart?.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-products">
          <div className="cart-items">
            {cart?.items?.map((item) => (
              <div key={item.productId._id} className="cart-item">
                <img
                  src={item.productId.image || "/placeholder.svg"}
                  alt={item.productId.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.productId.title}</h3>
                  <p>₹{item.productId.price}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => handleDecrease(item.productId._id)}
                    className="btn-action"
                  >
                    {item.quantity === 1 ? (
                      <Trash2 className="icon" />
                    ) : (
                      <Minus className="icon" />
                    )}
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleAdd(item.productId._id)}
                    className="btn-action"
                  >
                    <Plus className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-total">
              <span>Subtotal ({cart.length} items):</span>
              <span>₹{calculateSubtotal()}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate("/cart/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
