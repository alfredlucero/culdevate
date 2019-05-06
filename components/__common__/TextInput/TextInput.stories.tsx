import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../StoryFrame";
import TextInput from "./index";

storiesOf("TextInput", module).add("Default", () => (
  <StoryFrame>
    <TextInput value="someTextInput" name="textInputName" valid={true} touched={true} type="text" onChange={() => {}} />
  </StoryFrame>
));
