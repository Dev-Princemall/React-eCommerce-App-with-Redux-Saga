import { api, handleApiError } from "./api";

export const fetchProductsFromAPI = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addProductToAPI = async (product) => {
  try {
    const response = await api.post("/products", product);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProductInAPI = async (id, updatedProduct) => {
  try {
    const response = await api.put(`/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteProductFromAPI = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    return id;
  } catch (error) {
    handleApiError(error);
  }
};
