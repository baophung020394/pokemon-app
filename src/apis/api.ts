import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_PUBLIC_API}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
