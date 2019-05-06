import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../StoryFrame";
import TextArea from "./index";

storiesOf("TextArea", module).add("Default", () => (
  <StoryFrame>
    <TextArea value="someTextAreaInput" name="textAreaName" valid={true} touched={true} onChange={() => {}} />
  </StoryFrame>
));
