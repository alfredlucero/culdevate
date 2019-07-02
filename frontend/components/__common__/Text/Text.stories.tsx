import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../StoryFrame";
import { H1, H2, H3, H4, P } from "./index";

storiesOf("common/Text", module).add("H1, H2, H3, H4, P", () => (
  <StoryFrame>
    <H1>Culdevate Header 1 Text</H1>
    <H2>Culdevate Header 2 Text</H2>
    <H3>Culdevate Header 3 Text</H3>
    <H4>Culdevate Header 4 Text</H4>
    <P>Culdevate Paragraph Text</P>
    <P small>Culdevate Paragraph Small Text</P>
  </StoryFrame>
));
