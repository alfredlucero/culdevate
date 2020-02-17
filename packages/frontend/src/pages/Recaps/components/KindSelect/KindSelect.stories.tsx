import React from "react";
import { storiesOf } from "@storybook/react";
import KindSelect from "./index";

storiesOf("RecapsPage/KindSelect", module)
  .add("Option Selected", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <KindSelect id="kindSelect" value="Work Experience" onChange={() => {}} />
    </div>
  ))
  .add("Not selected", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <KindSelect id="kindSelect" value="" onChange={() => {}} />
    </div>
  ));
