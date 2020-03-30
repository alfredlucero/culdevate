import React from "react";
import { storiesOf } from "@storybook/react";
import Checkbox from "./index";

const onChange = () => {
  console.log("Change checkbox");
};

storiesOf("Common/Checkbox", module)
  .add("Default Unchecked", () => (
    <Checkbox onChange={onChange} id="checkboxId" checked={false} label="Checkbox Label" />
  ))
  .add("Checked", () => <Checkbox onChange={onChange} id="checkboxId" checked={true} label="Checkbox Label" />)
  .add("Disabled", () => (
    <Checkbox onChange={onChange} id="checkboxId" checked={true} label="Checkbox Label" disabled={true} />
  ));
