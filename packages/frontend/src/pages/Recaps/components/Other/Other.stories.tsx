import React from "react";
import { storiesOf } from "@storybook/react";
import OtherForm from "./Form";
import OtherRecap from "./Recap";
import OtherListCard from "./ListCard";
import OtherEmptyCard from "./EmptyCard";
import OtherLayout from "./Layout";
import { RecapOther, RecapKind } from "../../recaps.interface";

const other: RecapOther = {
  title: "Finished reading Clean Code book!",
  kind: RecapKind.Other,
  userId: "userId",
  _id: "otherId",
  startDate: new Date("2017/10/20").toISOString(),
  endDate: new Date("2017/12/20").toISOString(),
  bulletPoints: ["Learned about how to write cleaner and more maintainable code", "Improved with code reviews"],
};

const onEdit = () => {
  console.log("Edit clicked!");
};

const onDelete = () => {
  console.log("Delete clicked!");
};

const onClickAdd = () => {
  console.log("Add clicked!");
};

const onClickView = () => {
  console.log("View clicked!");
};

const onGoBackToLanding = () => {
  console.log("Go back to landing!");
};

const onCreateRecapSuccess = () => {
  console.log("Create recap success!");
};

const onUpdateRecapSuccess = () => {
  console.log("Update recap success!");
};

const onDeleteRecapSuccess = () => {
  console.log("Delete recap success!");
};

storiesOf("RecapsPage/Other", module)
  .add("Form", () => <OtherForm initialRecap={null} isShowing={true} onHide={() => {}} onSaveSuccess={() => {}} />)
  .add("Recap", () => <OtherRecap other={other} onEdit={onEdit} onDelete={onDelete} />)
  .add("List Card", () => <OtherListCard onClick={onClickView} />)
  .add("Empty Card", () => <OtherEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => (
    <OtherLayout
      recaps={[]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ))
  .add("Layout - With Data", () => (
    <OtherLayout
      recaps={[other]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ));
