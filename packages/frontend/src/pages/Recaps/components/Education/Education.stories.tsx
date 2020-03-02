import React from "react";
import { storiesOf } from "@storybook/react";
import EducationForm from "./Form";
import EducationRecap from "./Recap";
import EducationListCard from "./ListCard";
import EducationEmptyCard from "./EmptyCard";
import { RecapEducation } from "../../../../interfaces/recaps.interface";

const education: RecapEducation = {
  kind: "Education",
  userId: "userId",
  _id: "educationId",
  bulletPoints: [
    "Upsilon Pi Epsilon Computer Science Honor Society",
    "Alpha Phi Sigma Honor Society",
    "Daily Bruin Web Development Intern",
  ],
  startDate: new Date("2013/10/01"),
  endDate: new Date("2017/06/20"),
  school: "University of California, Los Angeles",
  location: "Los Angeles, CA",
  degree: "Bachelor of Science",
  fieldOfStudy: "Computer Science",
  grade: "Alumnus",
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

storiesOf("RecapsPage/Education", module)
  .add("Form", () => <EducationForm />)
  .add("Recap - Date Range", () => <EducationRecap education={education} onEdit={onEdit} onDelete={onDelete} />)
  .add("Recap - Present", () => (
    <EducationRecap
      education={{
        _id: education._id,
        kind: education.kind,
        userId: education.userId,
        startDate: education.startDate,
        bulletPoints: education.bulletPoints,
        school: education.school,
        location: education.location,
        degree: education.degree,
        fieldOfStudy: education.fieldOfStudy,
        grade: education.grade,
      }}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ))
  .add("Recap - Empty Grade and Degree Optional Fields", () => (
    <EducationRecap
      education={{
        _id: education._id,
        kind: education.kind,
        userId: education.userId,
        startDate: education.startDate,
        bulletPoints: education.bulletPoints,
        school: education.school,
        degree: "",
        location: education.location,
        fieldOfStudy: education.fieldOfStudy,
        grade: "",
      }}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ))
  .add("List Card", () => <EducationListCard onClickView={onClickView} onClickAdd={onClickAdd} count={10} />)
  .add("Empty Card", () => <EducationEmptyCard onClickAdd={onClickAdd} />);