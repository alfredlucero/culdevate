// Polyfills to support libraries like yup in older browsers
import "core-js/es";
import React from "react";
import ReactDOM from "react-dom";
import axios, { AxiosResponse, AxiosError } from "axios";
import App from "./App";
import { AuthProvider } from "./AuthProvider";
import { AuthTokenLocalStorage } from "./utils/authTokenLocalStorage";
import browserHistory from "./utils/browserHistory";

axios.defaults.baseURL = process.env.API_HOST;

axios.interceptors.request.use(
  config => {
    // Before any axios request, attempt to add Authorization header for authenticated requests to the backend
    // The JWT auth token is stored in localStorage upon logging in or signing up
    const authToken = AuthTokenLocalStorage.getAuthToken();
    config.headers["Authorization"] = `Bearer ${authToken}`;

    return config;
  },
  error => {
    console.log("Axios Request Error: ", error);
  },
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // Successful response with 2XX status codes
    return response;
  },
  (error: AxiosError) => {
    // Any error response falling outside the 2XX range will go through here!

    // If the user's auth token doesn't exist or expired (user is no longer logged in),
    // requests will fail with a 403 response from the backend
    // In that case, we will redirect the user back to the login page
    if (error.response && error.response.status === 403) {
      browserHistory.push("/login");
    }
  },
);

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("culdevate-root"),
);
