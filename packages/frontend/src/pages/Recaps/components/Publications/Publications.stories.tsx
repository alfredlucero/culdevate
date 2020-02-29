import React from "react";
import { storiesOf } from "@storybook/react";
import PublicationsForm from "./Form";
import PublicationsRecap from "./Recap";
import PublicationsListCard from "./ListCard";
import { RecapPublications } from "../../../../interfaces/recaps.interface";

const publications: RecapPublications = {
  title: "Mindfulness-based Interventions for those with PTSD",
  kind: "Publications",
  coauthors: "Gingin D.",
  userId: "userId",
  _id: "publicationsId",
  type: "Journal",
  bulletPoints: ["Providing meditation and cognitive behavioral therapy techniques for those with PTSD"],
  publisher: "UCI Psychology",
  startDate: new Date("2020/10/20"),
  url: "http://psychology.journal.com",
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

storiesOf("RecapsPage/Publications", module)
  .add("Form", () => <PublicationsForm />)
  .add("Recap", () => <PublicationsRecap publications={publications} onEdit={onEdit} onDelete={onDelete} />)
  .add("List Card", () => <PublicationsListCard onClickView={onClickView} onClickAdd={onClickAdd} count={10} />);
