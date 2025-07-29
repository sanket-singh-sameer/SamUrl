import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url,slug) => {
  const {data} = await axiosInstance.post("/api/create", { url, slug });
  return data;
};

export const getUserUrls = async (userId) => {
  const {data} = await axiosInstance.get(`/api/urls/${userId}`);
  return data;
};