import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../StoryFrame";
import TextArea from "./index";

const requiredTextAreaProps = {
  id: "some-text-area-id",
  value: "someTextAreaInput",
  name: "textAreaName",
  valid: true,
  touched: true,
  onChange: () => {},
};

storiesOf("common/TextArea", module)
  .add("Default", () => (
    <StoryFrame>
      <TextArea {...requiredTextAreaProps} />
    </StoryFrame>
  ))
  .add("Valid + Info Message", () => (
    <StoryFrame>
      <TextArea {...requiredTextAreaProps} infoMessage="Some info message" />
    </StoryFrame>
  ))
  .add("Error + Error Message", () => (
    <StoryFrame>
      <TextArea {...requiredTextAreaProps} valid={false} errorMessage="Some error message" />
    </StoryFrame>
  ))
  .add("Label + placeholder + disabled + required", () => (
    <StoryFrame>
      <TextArea
        {...requiredTextAreaProps}
        label="Some label"
        placeholder="Some placeholder text"
        value=""
        disabled={true}
        required={true}
      />
    </StoryFrame>
  ));
