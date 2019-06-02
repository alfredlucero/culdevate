import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../StoryFrame";
import Button from "./index";

storiesOf("common/Button", module)
  .add("Primary Button Small", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="button" kind="primary" size="small">
        Primary
      </Button>
    </StoryFrame>
  ))
  .add("Primary Submit Medium", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="submit" kind="primary" size="medium">
        Primary
      </Button>
    </StoryFrame>
  ))
  .add("Primary Submit Medium Disabled", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="submit" kind="primary" size="medium" disabled={true}>
        Primary
      </Button>
    </StoryFrame>
  ))
  .add("Primary Reset Large", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="reset" kind="primary" size="large">
        Primary
      </Button>
    </StoryFrame>
  ))
  .add("Secondary Button Small", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="button" kind="secondary" size="small">
        Secondary
      </Button>
    </StoryFrame>
  ))
  .add("Secondary Submit Medium", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="submit" kind="secondary" size="medium">
        Secondary
      </Button>
    </StoryFrame>
  ))
  .add("Secondary Submit Medium Disabled", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="submit" kind="secondary" size="medium" disabled={true}>
        Secondary
      </Button>
    </StoryFrame>
  ))
  .add("Secondary Reset Large", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="reset" kind="secondary" size="large">
        Secondary
      </Button>
    </StoryFrame>
  ))
  .add("Danger Button Small", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="button" kind="danger" size="small">
        Danger
      </Button>
    </StoryFrame>
  ))
  .add("Danger Submit Medium", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="submit" kind="danger" size="medium">
        Danger
      </Button>
    </StoryFrame>
  ))
  .add("Danger Submit Medium Disabled", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="submit" kind="danger" size="medium" disabled={true}>
        Danger
      </Button>
    </StoryFrame>
  ))
  .add("Danger Reset Large", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="reset" kind="danger" size="large">
        Danger
      </Button>
    </StoryFrame>
  ))
  .add("Secondary Danger Button Small", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="button" kind="secondaryDanger" size="small">
        Secondary Danger
      </Button>
    </StoryFrame>
  ))
  .add("Secondary Danger Submit Medium", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="submit" kind="secondaryDanger" size="medium">
        Secondary Danger
      </Button>
    </StoryFrame>
  ))
  .add("Secondary Danger Submit Medium Disabled", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="submit" kind="secondaryDanger" size="medium" disabled={true}>
        Secondary Danger
      </Button>
    </StoryFrame>
  ))
  .add("Secondary Danger Reset Large", () => (
    <StoryFrame>
      <Button onClick={() => {}} type="reset" kind="secondaryDanger" size="large">
        Secondary Danger
      </Button>
    </StoryFrame>
  ));
