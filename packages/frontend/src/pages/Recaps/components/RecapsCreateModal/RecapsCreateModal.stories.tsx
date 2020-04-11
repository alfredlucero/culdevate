import React from "react";
import { storiesOf } from "@storybook/react";
import RecapsCreateModal from "./index";

const onHide = () => {
  console.log("Hide confirm delete modal!");
};

storiesOf("RecapsPage/RecapsCreateModal", module).add("Default Open", () => (
  <RecapsCreateModal isShowing={true} onHide={onHide} kind="Work Experience">
    Some form content goes here
  </RecapsCreateModal>
));
