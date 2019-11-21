import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationAuth from "./index";

storiesOf("Common/Navigation Auth", module).add("Default", () => (
  <div>
    <Router>
      <div style={{ width: "250px", height: "100vh" }}>
        <NavigationAuth
          username="alfienity"
          onLogOut={() => {
            console.log("Logging out!");
          }}
        />
      </div>
    </Router>
  </div>
));
