import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "./index";

storiesOf("Common/Button", module)
  .add("Primary", () => (
    <Button variant="primary" onClick={() => {}}>
      Primary
    </Button>
  ))
  .add("Primary Disabled", () => (
    <Button variant="primary" onClick={() => {}} disabled={true}>
      Primary Disabled
    </Button>
  ))
  .add("Secondary", () => (
    <Button variant="secondary" onClick={() => {}}>
      Secondary
    </Button>
  ))
  .add("Secondary Disabled", () => (
    <Button variant="secondary" onClick={() => {}} disabled={true}>
      Secondary Disabled
    </Button>
  ));
