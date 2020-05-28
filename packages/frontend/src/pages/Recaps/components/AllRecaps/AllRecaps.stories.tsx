import React from "react";
import { storiesOf } from "@storybook/react";
import AllRecapsEmptyCard from "./EmptyCard";
import AllRecapsForm from "./Form";
import AllRecapsLayout from "./Layout";
import {
  RecapKind,
  RecapWorkExperience,
  RecapEducation,
  RecapAccomplishments,
  RecapOrganizations,
  RecapSkills,
  RecapSideProjects,
  RecapPublications,
  RecapReferences,
  RecapOther,
} from "../../recaps.interface";

const onClickAdd = () => {
  console.log("Add clicked!");
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

const workExperience: RecapWorkExperience = {
  kind: RecapKind.WorkExperience,
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
const education: RecapEducation = {
  kind: RecapKind.Education,
  userId: "userId",
  _id: "educationId",
  bulletPoints: [
    "Upsilon Pi Epsilon Computer Science Honor Society",
    "Alpha Phi Sigma Honor Society",
    "Daily Bruin Web Development Intern",
  ],
  startDate: new Date("2013/10/01").toISOString(),
  endDate: new Date("2017/06/20").toISOString(),
  school: "University of California, Los Angeles",
  location: "Los Angeles, CA",
  degree: "Bachelor of Science",
  fieldOfStudy: "Computer Science",
  grade: "Alumnus",
};
const accomplishments: RecapAccomplishments = {
  title: "Promoted to Software Engineer 2 at SendGrid",
  kind: RecapKind.Accomplishments,
  userId: "userId",
  _id: "accomplishmentsId",
  type: "Career",
  bulletPoints: [
    "Led migration of manual frontend deployments and hosting on on-prem nginx servers to AWS S3 and CloudFront with Terraform and Buildkite for CICD",
    "Contributed to the development and pushed the final release of the redesigned Email Activity in Backbone/Marionette",
    "Led the transition from an in-house Ruby Selenium solution to WebdriverIO and finally to Cypress for E2E tests",
  ],
  startDate: new Date("2018/10/20").toISOString(),
};
const organizations: RecapOrganizations = {
  organizationName: "Zeta Mu Beta",
  positions: "Pledge Educator, Member",
  location: "Long Beach, CA",
  startDate: new Date("2014/12/13").toISOString(),
  endDate: new Date("2016/03/31").toISOString(),
  kind: RecapKind.Organizations,
  userId: "userId",
  _id: "organizationsId",
  bulletPoints: [
    "Crossed into the organization in Fall 2014",
    "Served as an active member for 2 years and as a pledge educator for the XI class",
  ],
};
const skills: RecapSkills = {
  title: "Tagalog",
  kind: RecapKind.Skills,
  userId: "userId",
  _id: "skillsId",
  proficiency: "Intermediate",
  bulletPoints: [
    "Not a fluent speaker but can understand every day Tagalog speaking well",
    "Can speak some Tagalog here and there but struggle with grammar",
  ],
};
const sideProjects: RecapSideProjects = {
  title: "Zeta Mu Beta Website",
  creators: "Alfred Lucero and Regine Deguzman",
  startDate: new Date("2016/11/01").toISOString(),
  endDate: new Date("2016/12/31").toISOString(),
  kind: RecapKind.SideProjects,
  userId: "userId",
  _id: "sideProjectsId",
  bulletPoints: ["Created fraternity website on www.zetamubeta.org with MEAN stack"],
};
const publications: RecapPublications = {
  title: "Mindfulness-based Interventions for those with PTSD",
  kind: RecapKind.Publications,
  coauthors: "Gingin D.",
  userId: "userId",
  _id: "publicationsId",
  type: "Journal",
  bulletPoints: ["Providing meditation and cognitive behavioral therapy techniques for those with PTSD"],
  publisher: "UCI Psychology",
  startDate: new Date("2020/10/20").toISOString(),
  url: "http://psychology.journal.com",
};
const references: RecapReferences = {
  title: "Andrew C. - Product Manager",
  kind: RecapKind.References,
  userId: "userId",
  _id: "referencesId",
  company: "Sandia National Laboratories",
  bulletPoints: [
    "Worked under Andrew in building a Node.js, MongoDB, Neo4J bitcoin transaction visualization and classification prototype with D3.js sankey flows",
    "Mentored by Ethan C. and worked with Steven R. in building out the frontend and parts of the backend",
  ],
  phoneNumber: "555-555-5555",
  email: "ac@sandia.test",
};
const other: RecapOther = {
  title: "Finished reading Clean Code book!",
  kind: RecapKind.Other,
  userId: "userId",
  _id: "otherId",
  startDate: new Date("2017/10/20").toISOString(),
  endDate: new Date("2017/12/20").toISOString(),
  bulletPoints: ["Learned about how to write cleaner and more maintainable code", "Improved with code reviews"],
};

storiesOf("RecapsPage/All Recaps", module)
  .add("Form", () => (
    <AllRecapsForm
      selectedKind={RecapKind.WorkExperience}
      initialRecap={null}
      isShowing={true}
      onHide={() => {}}
      onSaveSuccess={() => {}}
    />
  ))
  .add("Empty Card", () => <AllRecapsEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => (
    <AllRecapsLayout
      recapsMap={{
        workExperience: [],
        education: [],
        accomplishments: [],
        organizations: [],
        skills: [],
        sideProjects: [],
        publications: [],
        references: [],
        other: [],
      }}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ))
  .add("Layout - With Data", () => (
    <AllRecapsLayout
      recapsMap={{
        workExperience: [workExperience],
        education: [education],
        accomplishments: [accomplishments],
        organizations: [organizations],
        skills: [skills],
        sideProjects: [sideProjects],
        publications: [publications],
        references: [references],
        other: [other],
      }}
      onGoBackToLanding={onGoBackToLanding}
      onCreateRecapSuccess={onCreateRecapSuccess}
      onUpdateRecapSuccess={onUpdateRecapSuccess}
      onDeleteRecapSuccess={onDeleteRecapSuccess}
    />
  ));
