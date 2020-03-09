import React from "react";
import { storiesOf } from "@storybook/react";
import AccomplishmentsForm from "./Form";
import AccomplishmentsRecap from "./Recap";
import AccomplishmentsListCard from "./ListCard";
import AccomplishmentsEmptyCard from "./EmptyCard";
import AccomplishmentsLayout from "./Layout";
import { RecapAccomplishments } from "../../../../interfaces/recaps.interface";

const accomplishments: RecapAccomplishments = {
  title: "Promoted to Software Engineer 2 at SendGrid",
  kind: "Accomplishments",
  userId: "userId",
  _id: "accomplishmentsId",
  type: "Career",
  bulletPoints: [
    "Led migration of manual frontend deployments and hosting on on-prem nginx servers to AWS S3 and CloudFront with Terraform and Buildkite for CICD",
    "Contributed to the development and pushed the final release of the redesigned Email Activity in Backbone/Marionette",
    "Led the transition from an in-house Ruby Selenium solution to WebdriverIO and finally to Cypress for E2E tests",
  ],
  startDate: new Date("2018/10/20"),
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

storiesOf("RecapsPage/Accomplishments", module)
  .add("Form", () => <AccomplishmentsForm />)
  .add("Recap", () => <AccomplishmentsRecap accomplishments={accomplishments} onEdit={onEdit} onDelete={onDelete} />)
  .add("List Card", () => <AccomplishmentsListCard onClick={onClickView} />)
  .add("Empty Card", () => <AccomplishmentsEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => (
    <AccomplishmentsLayout
      recaps={[]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ))
  .add("Layout - With Data", () => (
    <AccomplishmentsLayout
      recaps={[accomplishments]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ));
