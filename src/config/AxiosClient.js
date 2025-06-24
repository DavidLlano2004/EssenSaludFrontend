import axios from "axios";

const createAxiosClient = (baseURL) => {
  const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
  });

  return axiosClient;
};

export const axiosClientAuth = createAxiosClient(
  import.meta.env.VITE_BACKEND_APP
);
