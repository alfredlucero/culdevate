import React from "react";
import { storiesOf } from "@storybook/react";
import RecapsCreateSuccessAlert from "./RecapsCreateSuccessAlert";
import RecapsCreateErrorAlert from "./RecapsCreateErrorAlert";
import RecapsUpdateSuccessAlert from "./RecapsUpdateSuccessAlert";
import RecapsUpdateErrorAlert from "./RecapsUpdateErrorAlert";
import RecapsDeleteSuccessAlert from "./RecapsDeleteSuccessAlert";
import RecapsDeleteErrorAlert from "./RecapsDeleteErrorAlert";

const onHide = () => {
  console.log("Hide alert!");
};

storiesOf("RecapsPage/Alerts", module)
  .add("Create Success", () => <RecapsCreateSuccessAlert onHide={onHide} isShowing={true} kind="Work Experience" />)
  .add("Create Error", () => <RecapsCreateErrorAlert onHide={onHide} isShowing={true} kind="Work Experience" />)
  .add("Update Success", () => <RecapsUpdateSuccessAlert onHide={onHide} isShowing={true} kind="Work Experience" />)
  .add("Update Error", () => <RecapsUpdateErrorAlert onHide={onHide} isShowing={true} kind="Work Experience" />)
  .add("Delete Success", () => <RecapsDeleteSuccessAlert onHide={onHide} isShowing={true} kind="Work Experience" />)
  .add("Delete Error", () => <RecapsDeleteErrorAlert onHide={onHide} isShowing={true} kind="Work Experience" />);
