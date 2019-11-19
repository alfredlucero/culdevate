import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import LoginPage from "./index";

storiesOf("LoginPage", module).add("Default", () => (
  <div>
    <Router>
      <LoginPage />
    </Router>
  </div>
));
