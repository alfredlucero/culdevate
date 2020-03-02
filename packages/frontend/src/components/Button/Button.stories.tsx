import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "./index";

storiesOf("Common/Button", module)
  .add("Primary", () => (
    <Button type="button" variant="primary" onClick={() => {}}>
      Primary
    </Button>
  ))
  .add("Primary Loading", () => (
    <Button type="button" variant="primary" loading={true} onClick={() => {}}>
      Primary Loading...
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
  .add("Secondary Loading", () => (
    <Button type="reset" variant="secondary" loading={true} onClick={() => {}}>
      Secondary Loading...
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
  .add("Danger Loading", () => (
    <Button type="reset" variant="danger" loading={true} onClick={() => {}}>
      Danger Loading...
    </Button>
  ))
  .add("Danger Disabled", () => (
    <Button type="button" variant="danger" onClick={() => {}} disabled={true}>
      Danger Disabled
    </Button>
  ))
  .add("Unstyled", () => (
    <Button variant="unstyled" onClick={() => {}} type="button">
      <div style={{ backgroundColor: "lightgreen" }}>
        <h1>Unstyled</h1>
        <p>Button</p>
      </div>
    </Button>
  ))
  .add("Unstyled Disabled", () => (
    <Button variant="unstyled" onClick={() => {}} type="button" disabled={true}>
      <div style={{ backgroundColor: "lightgreen" }}>
        <h1>Unstyled</h1>
        <p>Button</p>
        <p>Disabled</p>
      </div>
    </Button>
  ));
