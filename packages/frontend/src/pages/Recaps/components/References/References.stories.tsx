import React from "react";
import { storiesOf } from "@storybook/react";
import ReferencesForm from "./Form";
import ReferencesRecap from "./Recap";
import ReferencesListCard from "./ListCard";
import ReferencesEmptyCard from "./EmptyCard";
import ReferencesLayout from "./Layout";
import { RecapReferences } from "../../../../interfaces/recaps.interface";

const references: RecapReferences = {
  title: "Andrew C. - Product Manager",
  kind: "References",
  userId: "userId",
  _id: "referencesId",
  company: "Sandia National Laboratories",
  bulletPoints: [
    "Worked under Andrew in building a Node.js, MongoDB, Neo4J bitcoin transaction visualization and classification prototype with D3.js sankey flows",
    "Mentored by Ethan C. and worked with Steven R. in building out the frontend and parts of the backend",
  ],
  phoneNumber: "555-555-5555",
  email: "ac@sandia.gov",
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

storiesOf("RecapsPage/References", module)
  .add("Form", () => <ReferencesForm />)
  .add("Recap", () => <ReferencesRecap references={references} onEdit={onEdit} onDelete={onDelete} />)
  .add("Recap - Empty Phone and Email", () => (
    <ReferencesRecap
      references={{
        _id: references._id,
        userId: references.userId,
        title: references.title,
        company: references.company,
        kind: references.kind,
        bulletPoints: references.bulletPoints,
        phoneNumber: "",
        email: "",
      }}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ))
  .add("List Card", () => <ReferencesListCard onClick={onClickView} />)
  .add("Empty Card", () => <ReferencesEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => (
    <ReferencesLayout
      recaps={[]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ))
  .add("Layout - With Data", () => (
    <ReferencesLayout
      recaps={[references]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ));
