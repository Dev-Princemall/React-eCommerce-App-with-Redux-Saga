import { api, handleApiError } from "./api";

// Place a new order
export const placeOrder = async (orderData) => {
  try {
    const response = await api.post("/api/orders/create", orderData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch order history for the logged-in user
export const getOrderHistory = async () => {
  try {
    const response = await api.get("/api/orders/user-orders");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch a specific order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Cancel an order
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
