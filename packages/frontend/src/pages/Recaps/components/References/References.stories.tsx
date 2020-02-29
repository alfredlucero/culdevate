import React from "react";
import { storiesOf } from "@storybook/react";
import ReferencesForm from "./Form";
import ReferencesRecap from "./Recap";
import ReferencesListCard from "./ListCard";
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
  .add("List Card", () => <ReferencesListCard onClickView={onClickView} onClickAdd={onClickAdd} count={10} />);
