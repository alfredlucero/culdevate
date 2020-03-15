import React from "react";
import { storiesOf } from "@storybook/react";
import WorkExperienceForm from "./Form";
import WorkExperienceRecap from "./Recap";
import WorkExperienceListCard from "./ListCard";
import WorkExperienceEmptyCard from "./EmptyCard";
import WorkExperienceLayout from "./Layout";
import { RecapWorkExperience } from "../../recaps.interface";

const workExperience: RecapWorkExperience = {
  kind: "Work Experience",
  userId: "userId",
  _id: "workExperienceId",
  bulletPoints: [
    "Worked on the Culdevate start up seriously",
    "Getting better at making REST API endpoints",
    "Improving interviewing and mentoring skills",
  ],
  startDate: new Date("2020/01/17").toISOString(),
  title: "Lead Software Engineer",
  company: "Culdevate",
  location: "Long Beach, CA",
  employmentType: "Self-Employed",
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

storiesOf("RecapsPage/WorkExperience", module)
  .add("Form", () => <WorkExperienceForm />)
  .add("Recap - Date Range", () => (
    <WorkExperienceRecap
      workExperience={{ ...workExperience, endDate: new Date("2020/03/20").toISOString() }}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ))
  .add("Recap - Present", () => (
    <WorkExperienceRecap workExperience={workExperience} onEdit={onEdit} onDelete={onDelete} />
  ))
  .add("List Card", () => <WorkExperienceListCard onClick={onClickView} />)
  .add("Empty Card", () => <WorkExperienceEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => (
    <WorkExperienceLayout
      recaps={[]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ))
  .add("Layout - With Data", () => (
    <WorkExperienceLayout
      recaps={[
        workExperience,
        {
          ...workExperience,
          endDate: new Date("2020/03/20").toISOString(),
        },
      ]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ));
