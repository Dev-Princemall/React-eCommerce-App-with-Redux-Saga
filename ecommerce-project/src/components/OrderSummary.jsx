import { selectLoggedUsersCart } from "../redux/selectors";
import { useSelector } from "react-redux";
export default function OrderSummary() {
  const cart = useSelector(selectLoggedUsersCart);
  console.log(cart);
  return (
    <div className="order-summary">
      {cart.map((item, index) => (
        <div className="order-item" key={index}>
          <img src={item.image} alt={item.title} className="order-item-image" />
          <div className="order-item-details">
            <h3>Quantity: {item.title}</h3>
            <p>{item.quantity}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
