import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import SignupPage from "./index";

storiesOf("SignupPage", module).add("Default", () => (
  <div>
    <Router>
      <SignupPage />
    </Router>
  </div>
));
