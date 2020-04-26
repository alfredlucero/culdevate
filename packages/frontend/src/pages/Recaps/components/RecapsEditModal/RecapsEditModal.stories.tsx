import React from "react";
import { storiesOf } from "@storybook/react";
import RecapsEditModal from "./index";
import { RecapKind } from "../../recaps.interface";

const onHide = () => {
  console.log("Hide confirm delete modal!");
};

storiesOf("RecapsPage/RecapsEditModal", module).add("Default Open", () => (
  <RecapsEditModal isShowing={true} onHide={onHide} kind={RecapKind.WorkExperience}>
    Some form content goes here
  </RecapsEditModal>
));
