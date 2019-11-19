import React from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./index";

storiesOf("Common/Text Input", module)
  .add("Default Text", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <TextInput id="text-input" value="Text Value" onChange={() => {}} type="text" />
    </div>
  ))
  .add("Default Password", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <TextInput id="password-input" value="Password Value" onChange={() => {}} type="password" />
    </div>
  ))
  .add("Required Label", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <TextInput
        id="text-input"
        value="Required Username"
        onChange={() => {}}
        type="text"
        label="Username"
        required={true}
      />
    </div>
  ))
  .add("Disabled Placeholder", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <TextInput
        id="text-input"
        value=""
        placeholder="Enter a username..."
        onChange={() => {}}
        type="text"
        label="Username"
        disabled={true}
      />
    </div>
  ))
  .add("Inline Text Info", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <TextInput
        id="text-input"
        value="testuser123"
        onChange={() => {}}
        type="text"
        label="Username"
        valid={true}
        textInfo="Please provide a username."
        disabled={true}
      />
    </div>
  ))
  .add("Inline Text Info", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <TextInput
        id="text-input"
        value="testuser123"
        onChange={() => {}}
        type="text"
        label="Username"
        valid={true}
        textInfo="Please provide a username."
      />
    </div>
  ))
  .add("Inline Error Info", () => (
    <div style={{ width: "400px", padding: "30px" }}>
      <TextInput
        id="text-input"
        value="testuser123"
        onChange={() => {}}
        type="text"
        label="Username"
        valid={false}
        errorInfo="Please provide a username."
      />
    </div>
  ));
