import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../__common__/StoryFrame";
import Recap, { RecapProps } from "./index";

const allRecapSampleProps: RecapProps[] = [
  {
    title: "Summaries and Goals",
    description: "I endeavor to achieve something!",
    type: "objectives",
    startDate: "2019/04/20",
    endDate: null,
  },
  {
    title: "Sandia National Labs",
    description: "Web Developer Intern",
    type: "work",
    startDate: "2016/06/20",
    endDate: "2017/06/10",
  },
  {
    title: "University of California, Los Angeles",
    description: "BS in Computer Science",
    type: "education",
    startDate: "2013/10/01",
    endDate: "2017/6/10",
  },
  {
    title: "Varsity Tennis",
    description: "SJB Tennis all 4 years",
    type: "extracurricular",
    startDate: "2009/09/15",
    endDate: "2013/5/20",
  },
  {
    title: "Terraform",
    description: "Learned how to do infrastructure as code with AWS stuff!",
    type: "skills",
    startDate: "2018/01/10",
    endDate: null,
  },
  {
    title: "Promoted to Software Engineer II",
    description: "After 1 year and many projects, I earned my stripes!",
    type: "achievements",
    startDate: "2018/10/20",
    endDate: null,
  },
  {
    title: "Arm in Arm Award",
    description: "Helped out CGE with Billing Rewrite to steer them back on time.",
    type: "awards",
    startDate: "2019/01/07",
    endDate: "2019/05/20",
  },
  {
    title: "Reference from Sandia Mentors",
    description: "Can check them out on LinkedIn",
    type: "proof",
    startDate: "2016/06/20",
    endDate: "2017/06/05",
  },
  {
    title: "Code Complete Book",
    description: "Finished reading this book!",
    type: "other",
    startDate: "2018/10/12",
    endDate: "2019/07/25",
  },
];

storiesOf("Recap", module).add("All Recap Types", () => (
  <StoryFrame>
    {allRecapSampleProps.map((recapSampleProps, idx) => (
      <Recap {...recapSampleProps} key={idx} />
    ))}
  </StoryFrame>
));
