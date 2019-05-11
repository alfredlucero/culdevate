import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../StoryFrame";
import TextInput, { TextInputType } from "./index";

const requiredTextInputProps = {
  value: "someTextInput",
  id: "some-text-input-id",
  name: "textInputName",
  valid: true,
  touched: true,
  type: "text" as TextInputType,
  onChange: () => {},
};

storiesOf("common/TextInput", module)
  .add("Default", () => (
    <StoryFrame>
      <TextInput {...requiredTextInputProps} />
      <TextInput {...requiredTextInputProps} value="some.email@domain.com" type="email" />
      <TextInput {...requiredTextInputProps} type="password" />
    </StoryFrame>
  ))
  .add("Valid + Info Message", () => (
    <StoryFrame>
      <TextInput {...requiredTextInputProps} infoMessage="Some info message" />
    </StoryFrame>
  ))
  .add("Error + Error Message", () => (
    <StoryFrame>
      <TextInput {...requiredTextInputProps} valid={false} errorMessage="Some error message" />
    </StoryFrame>
  ))
  .add("Label + placeholder + disabled + required", () => (
    <StoryFrame>
      <TextInput
        {...requiredTextInputProps}
        label="Some label"
        placeholder="Some placeholder text"
        value=""
        disabled={true}
        required={true}
      />
    </StoryFrame>
  ));
