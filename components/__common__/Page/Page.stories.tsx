import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../StoryFrame";
import Page from "./index";

storiesOf("Page", module).add("With some children", () => (
  <StoryFrame>
    <Page>
      <div>Some children</div>
    </Page>
  </StoryFrame>
));
