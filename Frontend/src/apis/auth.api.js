import axiosInstance from "../utils/axiosInstance";

export const login = async (email, password ) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const response = await axiosInstance.post("/user/login", {
    email,
    password,
  });
  return response.data; 
};

export const register = async (username, email, password) => {
  const response = await axiosInstance.post("/user/register", {
    username,
    email,
    password,
  });
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/user/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/user/me");
  return response.data;
};
