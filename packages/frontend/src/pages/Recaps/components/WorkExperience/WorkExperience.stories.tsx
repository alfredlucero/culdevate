import React from "react";
import { storiesOf } from "@storybook/react";
import WorkExperienceForm from "./Form";
import WorkExperienceRecap from "./Recap";

storiesOf("RecapsPage/WorkExperience", module)
  .add("Form", () => <WorkExperienceForm />)
  .add("Recap", () => <WorkExperienceRecap />);
