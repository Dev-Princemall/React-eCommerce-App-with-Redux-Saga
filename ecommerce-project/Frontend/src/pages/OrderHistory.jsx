import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Filter,
  Package,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { selectOrders } from "../redux/selectors";
import "../styles/OrderHistory.css";
import { fetchOrderHistory } from "../redux/order/actions";

export default function OrderHistory() {
  const orderHistory = useSelector(selectOrders) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);
  const filteredOrders = orderHistory
    .filter((order) => {
      const orderIdMatch = order._id
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const productMatch = order.items?.some((item) =>
        item.productId.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return orderIdMatch || productMatch;
    })
    .filter((order) => filterStatus === "all" || order.status === filterStatus)
    .sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };
  const printDeliveryAddress = (address) => {
    return (
      address["houseNumber"] +
      "," +
      address["street"] +
      "," +
      address["landmark"] +
      "," +
      address["city"] +
      "," +
      address["state"] +
      "-" +
      address["postalCode"] +
      "," +
      address["country"]
    );
  };
  return (
    <div className="order-history-container">
      <h1 className="order-history-title">Your Orders</h1>

      <div className="order-history-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <Filter size={20} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <button
          className="sort-button"
          onClick={() =>
            setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
          }
        >
          Sort {sortOrder === "desc" ? "Oldest" : "Newest"}
          {sortOrder === "desc" ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronUp size={20} />
          )}
        </button>
      </div>

      <div className="order-history-items">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="order-item">
              <div
                className="order-header"
                onClick={() => toggleOrderExpansion(order._id)}
              >
                <div className="order-icon">
                  <Package size={24} />
                </div>
                <div className="order-info">
                  <h2>Order #{order._id}</h2>
                  <p>{order.items?.length || 0} item(s)</p>
                </div>
                <div className="order-date">
                  <Calendar size={20} />
                  <span>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
                {expandedOrders.includes(order._id) ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
              {expandedOrders.includes(order._id) && (
                <div className="order-details">
                  <p>
                    <strong>Total:</strong> ₹
                    {order.totalAmount?.toFixed(2) || "0.00"}
                  </p>
                  <p>
                    <strong>Shipping Address:</strong>{" "}
                    {printDeliveryAddress(order.deliveryAddress) ||
                      "Not provided"}
                  </p>
                  {order.trackingNumber && (
                    <p>
                      <strong>Tracking Number:</strong> {order.trackingNumber}
                    </p>
                  )}
                  <div className="order-items-list">
                    <ul>
                      {order.items?.map((item, index) => (
                        <li key={index} className="order-item-row">
                          <img
                            src={item.productId.image}
                            alt={item.productId.title}
                            className="order-item-image"
                          />
                          <div className="order-item-info">
                            <p className="order-item-title">
                              {item.productId.title}
                            </p>
                            <p className="order-item-price">
                              {item.quantity}x (₹{item.price.toFixed(2)})
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
