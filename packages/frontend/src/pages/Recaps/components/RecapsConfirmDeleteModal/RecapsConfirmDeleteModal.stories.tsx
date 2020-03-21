import React from "react";
import { storiesOf } from "@storybook/react";
import RecapsConfirmDeleteModal from "./index";

const onHide = () => {
  console.log("Hide confirm delete modal!");
};

const onClickConfirmDelete = () => {
  console.log("Delete!");
};

storiesOf("RecapsPage/RecapsConfirmDeleteModal", module)
  .add("Default Open", () => (
    <RecapsConfirmDeleteModal
      isShowing={true}
      onClickConfirmDelete={onClickConfirmDelete}
      onHide={onHide}
      isProcessingDelete={false}
    />
  ))
  .add("Processing Delete", () => (
    <RecapsConfirmDeleteModal
      isShowing={true}
      onClickConfirmDelete={onClickConfirmDelete}
      onHide={onHide}
      isProcessingDelete={true}
    />
  ));
