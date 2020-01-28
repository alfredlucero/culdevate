import React from "react";
import { storiesOf } from "@storybook/react";
import Alert from "./index";

const onClose = () => {
  console.log("Alert closed!");
};

storiesOf("Common/Alert", module)
  .add("Success", () => (
    <Alert isVisible={true} onClose={onClose} variant="success">
      Success Alert
    </Alert>
  ))
  .add("Info", () => (
    <Alert isVisible={true} onClose={onClose} variant="info">
      Info Alert
    </Alert>
  ))
  .add("Warning", () => (
    <Alert isVisible={true} onClose={onClose} variant="warning">
      Warning Alert
    </Alert>
  ))
  .add("Danger", () => (
    <Alert isVisible={true} onClose={onClose} variant="danger">
      Danger Alert
    </Alert>
  ));
