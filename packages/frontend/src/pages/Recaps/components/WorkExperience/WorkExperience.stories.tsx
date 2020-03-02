import React from "react";
import { storiesOf } from "@storybook/react";
import WorkExperienceForm from "./Form";
import WorkExperienceRecap from "./Recap";
import WorkExperienceListCard from "./ListCard";
import WorkExperienceEmptyCard from "./EmptyCard";
import { RecapWorkExperience } from "../../../../interfaces/recaps.interface";

const workExperience: RecapWorkExperience = {
  kind: "Work Experience",
  userId: "userId",
  _id: "workExperienceId",
  bulletPoints: [
    "Worked on the Culdevate start up seriously",
    "Getting better at making REST API endpoints",
    "Improving interviewing and mentoring skills",
  ],
  startDate: new Date("2020/01/17"),
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

storiesOf("RecapsPage/WorkExperience", module)
  .add("Form", () => <WorkExperienceForm />)
  .add("Recap - Date Range", () => (
    <WorkExperienceRecap
      workExperience={{ ...workExperience, endDate: new Date("2020/03/20") }}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ))
  .add("Recap - Present", () => (
    <WorkExperienceRecap workExperience={workExperience} onEdit={onEdit} onDelete={onDelete} />
  ))
  .add("List Card", () => <WorkExperienceListCard onClickView={onClickView} onClickAdd={onClickAdd} count={10} />)
  .add("Empty Card", () => <WorkExperienceEmptyCard onClickAdd={onClickAdd} />);
