import { api, handleApiError } from "./api";

export const registerUserApi = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const loginUserApi = async (userData) => {
  try {
    const response = await api.post("/api/auth/login", userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserProfileApi = async () => {
  try {
    const response = await api.get("/api/auth/profile");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserProfileApi = async (userData) => {
  try {
    const response = await api.patch("/api/auth/profile", userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
