import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "./index";

storiesOf("Common/Button", module)
  .add("Primary", () => (
    <Button type="button" variant="primary" onClick={() => {}}>
      Primary
    </Button>
  ))
  .add("Primary Disabled", () => (
    <Button type="submit" variant="primary" onClick={() => {}} disabled={true}>
      Primary Disabled
    </Button>
  ))
  .add("Secondary", () => (
    <Button type="reset" variant="secondary" onClick={() => {}}>
      Secondary
    </Button>
  ))
  .add("Secondary Disabled", () => (
    <Button type="button" variant="secondary" onClick={() => {}} disabled={true}>
      Secondary Disabled
    </Button>
  ))
  .add("Danger", () => (
    <Button type="reset" variant="danger" onClick={() => {}}>
      Danger
    </Button>
  ))
  .add("Danger Disabled", () => (
    <Button type="button" variant="danger" onClick={() => {}} disabled={true}>
      Danger Disabled
    </Button>
  ));
