import React from "react";
import { storiesOf } from "@storybook/react";
import SideProjectsForm from "./Form";
import SideProjectsRecap from "./Recap";
import SideProjectsListCard from "./ListCard";
import SideProjectsEmptyCard from "./EmptyCard";
import SideProjectsLayout from "./Layout";
import { RecapSideProjects } from "../../recaps.interface";

const sideProjects: RecapSideProjects = {
  title: "Zeta Mu Beta Website",
  creators: "Alfred Lucero and Regine Deguzman",
  startDate: new Date("2016/11/01").toISOString(),
  endDate: new Date("2016/12/31").toISOString(),
  kind: "Side Projects",
  userId: "userId",
  _id: "sideProjectsId",
  bulletPoints: ["Created fraternity website on www.zetamubeta.org with MEAN stack"],
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

storiesOf("RecapsPage/SideProjects", module)
  .add("Form", () => <SideProjectsForm />)
  .add("Recap - Date Range", () => (
    <SideProjectsRecap sideProjects={sideProjects} onEdit={onEdit} onDelete={onDelete} />
  ))
  .add("Recap - Present", () => (
    <SideProjectsRecap
      sideProjects={{
        _id: sideProjects._id,
        userId: sideProjects.userId,
        startDate: sideProjects.startDate,
        title: sideProjects.title,
        creators: sideProjects.creators,
        kind: sideProjects.kind,
        bulletPoints: sideProjects.bulletPoints,
      }}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ))
  .add("List Card", () => <SideProjectsListCard onClick={onClickView} />)
  .add("Empty Card", () => <SideProjectsEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => (
    <SideProjectsLayout
      recaps={[]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ))
  .add("Layout - With Data", () => (
    <SideProjectsLayout
      recaps={[
        sideProjects,
        {
          _id: sideProjects._id,
          userId: sideProjects.userId,
          startDate: sideProjects.startDate,
          title: sideProjects.title,
          creators: sideProjects.creators,
          kind: sideProjects.kind,
          bulletPoints: sideProjects.bulletPoints,
        },
      ]}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ));
