import React from "react";
import { storiesOf } from "@storybook/react";
import KindSelect from "./index";
import { RecapKind } from "../../recaps.interface";

storiesOf("RecapsPage/KindSelect", module)
  .add("Option Selected", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <KindSelect id="kindSelect" value={RecapKind.WorkExperience} onChange={() => {}} />
    </div>
  ))
  .add("Not selected", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <KindSelect id="kindSelect" value="" onChange={() => {}} />
    </div>
  ));
