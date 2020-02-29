import React from "react";
import { storiesOf } from "@storybook/react";
import OrganizationsForm from "./Form";
import OrganizationsRecap from "./Recap";
import OrganizationsListCard from "./ListCard";
import { RecapOrganizations } from "../../../../interfaces/recaps.interface";

const organizations: RecapOrganizations = {
  organizationName: "Zeta Mu Beta",
  positions: "Pledge Educator, Member",
  location: "Long Beach, CA",
  startDate: new Date("2014/12/13"),
  endDate: new Date("2016/03/31"),
  kind: "Organizations",
  userId: "userId",
  _id: "organizationsId",
  bulletPoints: [
    "Crossed into the organization in Fall 2014",
    "Served as an active member for 2 years and as a pledge educator for the XI class",
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

storiesOf("RecapsPage/Organizations", module)
  .add("Form", () => <OrganizationsForm />)
  .add("Recap - Date Range", () => (
    <OrganizationsRecap organizations={organizations} onEdit={onEdit} onDelete={onDelete} />
  ))
  .add("Recap - Present", () => (
    <OrganizationsRecap
      organizations={{
        _id: organizations._id,
        userId: organizations.userId,
        positions: organizations.positions,
        location: organizations.location,
        organizationName: organizations.organizationName,
        startDate: organizations.startDate,
        kind: organizations.kind,
        bulletPoints: organizations.bulletPoints,
      }}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ))
  .add("List Card", () => <OrganizationsListCard onClickView={onClickView} onClickAdd={onClickAdd} count={10} />);
