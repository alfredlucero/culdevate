import React from "react";
import { storiesOf } from "@storybook/react";
import Alert from "./index";

const onHide = () => {
  console.log("Hide alert!");
};

storiesOf("Common/Alert", module)
  .add("Success", () => (
    <Alert isShowing={true} onHide={onHide} variant="success">
      Success Alert
    </Alert>
  ))
  .add("Info", () => (
    <Alert isShowing={true} onHide={onHide} variant="info">
      Info Alert
    </Alert>
  ))
  .add("Warning", () => (
    <Alert isShowing={true} onHide={onHide} variant="warning">
      Warning Alert
    </Alert>
  ))
  .add("Danger", () => (
    <Alert isShowing={true} onHide={onHide} variant="danger">
      Danger Alert
    </Alert>
  ));
