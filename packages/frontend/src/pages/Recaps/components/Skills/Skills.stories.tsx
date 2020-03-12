import React from "react";
import { storiesOf } from "@storybook/react";
import SkillsForm from "./Form";
import SkillsRecap from "./Recap";
import SkillsListCard from "./ListCard";
import SkillsEmptyCard from "./EmptyCard";
import SkillsLayout from "./Layout";
import { RecapSkills } from "../../recaps.interface";

const skills: RecapSkills = {
  title: "Tagalog",
  kind: "Skills",
  userId: "userId",
  _id: "skillsId",
  proficiency: "Intermediate",
  bulletPoints: [
    "Not a fluent speaker but can understand every day Tagalog speaking well",
    "Can speak some Tagalog here and there but struggle with grammar",
  ],
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

storiesOf("RecapsPage/Skills", module)
  .add("Form", () => <SkillsForm />)
  .add("Recap", () => <SkillsRecap skills={skills} onEdit={onEdit} onDelete={onDelete} />)
  .add("List Card", () => <SkillsListCard onClick={onClickView} />)
  .add("Empty Card", () => <SkillsEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => (
    <SkillsLayout
      recaps={[]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ))
  .add("Layout - With Data", () => (
    <SkillsLayout
      recaps={[skills]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ));
