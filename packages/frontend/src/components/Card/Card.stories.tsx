import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "./index";

storiesOf("Common/Card", module).add("Default", () => (
  <div style={{ width: "400px", padding: "30px", backgroundColor: "#efefef" }}>
    <Card>Card Children</Card>
  </div>
));
