import React from "react";
import { storiesOf } from "@storybook/react";
import Heading from "./index";

storiesOf("Common/Heading", module)
  .add("H1 Variant", () => <Heading variant="h1">H1 Variant</Heading>)
  .add("H1 Italic", () => (
    <Heading variant="h1" italic={true}>
      H1 Italic
    </Heading>
  ))
  .add("H2 Variant", () => <Heading variant="h2">H2 Variant</Heading>)
  .add("H3 Variant", () => <Heading variant="h3">H3 Variant</Heading>)
  .add("H4 Variant", () => <Heading variant="h4">H4 Variant</Heading>);
