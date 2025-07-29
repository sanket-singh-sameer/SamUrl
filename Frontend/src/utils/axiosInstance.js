import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  timeout: 10000,
  withCredentials: true,
});




// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // You can customize error handling here
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("API Error:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // No response received
      console.error("Network Error:", error.message);
      return Promise.reject({ message: "Network Error" });
    } else {
      // Something else happened
      console.error("Error:", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default axiosInstance;
