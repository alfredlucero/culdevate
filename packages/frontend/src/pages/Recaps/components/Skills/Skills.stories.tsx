import React from "react";
import { storiesOf } from "@storybook/react";
import SkillsForm from "./Form";
import SkillsRecap from "./Recap";
import { RecapSkills } from "../../../../interfaces/recaps.interface";

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

storiesOf("RecapsPage/Skills", module)
  .add("Form", () => <SkillsForm />)
  .add("Recap", () => <SkillsRecap skills={skills} onEdit={onEdit} onDelete={onDelete} />);
