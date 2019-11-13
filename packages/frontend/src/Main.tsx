// Polyfills to support libraries like yup in older browsers
import "core-js/es";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./AuthProvider";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("culdevate-root"),
);