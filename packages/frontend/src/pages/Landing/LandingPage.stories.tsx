import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import LandingPage from "./index";

storiesOf("LandingPage", module).add("Default", () => (
  <div>
    <Router>
      <LandingPage />
    </Router>
  </div>
));
