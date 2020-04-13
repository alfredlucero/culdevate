import React from "react";
import { storiesOf } from "@storybook/react";
import RecapsCreateModal from "./index";
import { RecapKind } from "../../recaps.interface";

const onHide = () => {
  console.log("Hide confirm delete modal!");
};

storiesOf("RecapsPage/RecapsCreateModal", module).add("Default Open", () => (
  <RecapsCreateModal isShowing={true} onHide={onHide} kind={RecapKind.WorkExperience}>
    Some form content goes here
  </RecapsCreateModal>
));
