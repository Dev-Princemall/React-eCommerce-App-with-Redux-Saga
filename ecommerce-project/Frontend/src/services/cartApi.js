import { api, handleApiError } from "./api";

// Get user's cart
export const getCart = async () => {
  try {
    const response = await api.get("/api/cart");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Add item to cart
export const addToCart = async (productId, userId, quantity = 1) => {
  try {
    const response = await api.post("/api/cart/add", {
      productId,
      userId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    handleApiError(error);
  }
};

// Update item quantity
export const updateCartItem = async (productId, userId, quantity) => {
  try {
    const response = await api.put("/api/cart/update", {
      productId,
      userId,
      quantity,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Increase item quantity
export const increaseQuantity = async (productId, userId) => {
  try {
    const response = await api.put("/api/cart/increase", { productId, userId });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Decrease item quantity
export const decreaseQuantity = async (productId, userId) => {
  try {
    const response = await api.put("/api/cart/decrease", { productId, userId });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Remove item from cart
export const removeCartItem = async (productId, userId) => {
  try {
    const response = await api.delete(
      `/api/cart/remove/${(productId, userId)}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Clear the entire cart
export const clearCart = async (userId) => {
  try {
    const response = await api.delete("/api/cart/clear");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
