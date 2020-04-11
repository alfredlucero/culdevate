import React from "react";
import { storiesOf } from "@storybook/react";
import RecapsEditModal from "./index";

const onHide = () => {
  console.log("Hide confirm delete modal!");
};

storiesOf("RecapsPage/RecapsEditModal", module).add("Default Open", () => (
  <RecapsEditModal isShowing={true} onHide={onHide} kind="Work Experience">
    Some form content goes here
  </RecapsEditModal>
));
