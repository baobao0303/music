/**
 * Axios client instance configured for the application.
 *
 * This client is pre-configured with a base URL and default headers for JSON content.
 * It also includes interceptors for request and response handling:
 *
 * - **Request Interceptor**: Passes the request configuration without modification.
 * - **Response Interceptor**: Extracts and returns the `data` property from the response object.
 *
 * In case of an error during the request or response, the promise is rejected with the error.
 *
 * @module axiosClient
 */
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error?.response?.data || error);
  }
);
export default axiosClient;
