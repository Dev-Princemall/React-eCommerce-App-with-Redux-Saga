import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

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
