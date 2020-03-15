import React from "react";
import { storiesOf } from "@storybook/react";
import * as RecapLayout from "./index";

storiesOf("RecapsPage/RecapLayout", module)
  .add("Default", () => (
    <RecapLayout.Container className="p-8">
      <RecapLayout.Header className="mb-8" onClickBack={() => {}}>
        <RecapLayout.HeaderTitle>Work Experience</RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>Work Experience description comes over here!</RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>Inner Content</RecapLayout.Content>
    </RecapLayout.Container>
  ))
  .add("Header with Add Button", () => (
    <RecapLayout.Container className="p-8">
      <RecapLayout.Header className="mb-8" onClickBack={() => {}}>
        <RecapLayout.HeaderTitle onClickAdd={() => {}}>Work Experience</RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>Work Experience description comes over here!</RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>Inner Content</RecapLayout.Content>
    </RecapLayout.Container>
  ));
