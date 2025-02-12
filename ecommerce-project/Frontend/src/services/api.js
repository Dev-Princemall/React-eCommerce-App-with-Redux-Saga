import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

export const addProductToAPI = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add product");
  }
};

export const updateProductInAPI = async (id, updatedProduct) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/products/${id}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update product"
    );
  }
};

export const deleteProductFromAPI = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
    return id; // Returning the deleted product ID
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};
