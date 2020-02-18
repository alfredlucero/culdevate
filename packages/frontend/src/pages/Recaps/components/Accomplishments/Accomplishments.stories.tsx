import React from "react";
import { storiesOf } from "@storybook/react";
import AccomplishmentsForm from "./Form";
import AccomplishmentsRecap from "./Recap";
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

storiesOf("RecapsPage/Accomplishments", module)
  .add("Form", () => <AccomplishmentsForm />)
  .add("Recap", () => <AccomplishmentsRecap accomplishments={accomplishments} onEdit={onEdit} onDelete={onDelete} />);
