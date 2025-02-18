import { selectCart } from "../redux/selectors";
import { useSelector } from "react-redux";
export default function OrderSummary() {
  const cart = useSelector(selectCart);
  return (
    <div className="order-summary">
      {cart?.items?.map((item, index) => {
        const { image, price, title } = item.productId;
        return (
          <div className="order-item" key={index}>
            <img src={image} alt={item.title} className="order-item-image" />
            <div className="order-item-details">
              <h3> {title}</h3>
              <p>{item.quantity}</p>
              <p>Price: ₹{price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
