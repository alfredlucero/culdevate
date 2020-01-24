import React from "react";
import { storiesOf } from "@storybook/react";
import Select, { SelectOption } from "./index";

const selectOptions: SelectOption[] = [
  { label: "Corgi", value: "corgi" },
  { label: "Dachsund", value: "dachsund" },
  { label: "Golden Retriever", value: "golden retriever" },
];

storiesOf("Common/Select", module)
  .add("Option Selected", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <Select id="select" value="corgi" options={selectOptions} onChange={() => {}} />
    </div>
  ))
  .add("Required Label", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <Select id="select" value="corgi" options={selectOptions} onChange={() => {}} label="Dogs" required={true} />
    </div>
  ))
  .add("Disabled Placeholder", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <Select
        id="select"
        value=""
        options={selectOptions}
        placeholder="Select a dog..."
        onChange={() => {}}
        label="Dogs"
        disabled={true}
      />
    </div>
  ))
  .add("Inline Text Info", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <Select
        id="select"
        value="corgi"
        options={selectOptions}
        onChange={() => {}}
        label="Dogs"
        valid={true}
        textInfo="Dog Info"
      />
    </div>
  ))
  .add("Inline Error Info", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <Select
        id="select"
        value=""
        options={selectOptions}
        onChange={() => {}}
        label="Dogs"
        valid={false}
        required={true}
        errorInfo="Please select a dog."
      />
    </div>
  ));
