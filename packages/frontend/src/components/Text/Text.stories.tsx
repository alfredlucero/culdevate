import React from "react";
import { storiesOf } from "@storybook/react";
import Text from "./index";

storiesOf("Common/Text", module)
  .add("Paragraph Variant", () => <Text variant="p">Paragraph Variant</Text>)
  .add("Paragraph Bold", () => (
    <Text variant="p" bold={true}>
      Paragraph Bold
    </Text>
  ))
  .add("Paragraph Italic", () => (
    <Text variant="p" italic={true}>
      Paragraph Italic
    </Text>
  ))
  .add("Paragraph Small", () => (
    <Text variant="p" small={true}>
      Paragraph Small
    </Text>
  ))
  .add("Span Variant", () => (
    <Text variant="span" small={true}>
      Span Variant
    </Text>
  ));
