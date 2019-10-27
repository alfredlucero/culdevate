import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationPublic from "./index";

storiesOf("Common/NavigationPublic", module).add("Default", () => (
  <div>
    <Router>
      <NavigationPublic />
    </Router>
  </div>
));
