import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "./index";

storiesOf("Common/Button", module)
  .add("Default", () => (
    <Button variant="primary" onClick={() => {}}>
      Primary
    </Button>
  ))
  .add("Disabled", () => (
    <Button variant="primary" onClick={() => {}} disabled={true}>
      Primary Disabled
    </Button>
  ));
