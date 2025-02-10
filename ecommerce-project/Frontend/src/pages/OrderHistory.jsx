"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Search,
  Filter,
  Package,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { selectLoggedUserOrderHistory } from "../redux/selectors";
import "../styles/OrderHistory.css";

export default function OrderHistory() {
  const orderHistory = useSelector(selectLoggedUserOrderHistory) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedOrders, setExpandedOrders] = useState([]);

  const filteredOrders = orderHistory
    .filter((order) => {
      const orderIdMatch = order.orderId
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const productMatch = order.items?.some((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div key={order.orderId} className="order-item">
              <div
                className="order-header"
                onClick={() => toggleOrderExpansion(order.orderId)}
              >
                <div className="order-icon">
                  <Package size={24} />
                </div>
                <div className="order-info">
                  <h2>Order #{order.orderId}</h2>
                  <p>{order.items.length} item(s)</p>
                </div>
                <div className="order-date">
                  <Calendar size={20} />
                  <span>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
                {expandedOrders.includes(order.orderId) ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
              {expandedOrders.includes(order.orderId) && (
                <div className="order-details">
                  <p>
                    <strong>Total:</strong> ₹{order.total}
                  </p>
                  <p>
                    <strong>Shipping Address:</strong>{" "}
                    {order.shippingAddress || "Not provided"}
                  </p>
                  {order.trackingNumber && (
                    <p>
                      <strong>Tracking Number:</strong> {order.trackingNumber}
                    </p>
                  )}
                  <div className="order-items-list">
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index} className="order-item-row">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="order-item-image"
                          />
                          <div className="order-item-info">
                            <p className="order-item-title">{item.title}</p>
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
