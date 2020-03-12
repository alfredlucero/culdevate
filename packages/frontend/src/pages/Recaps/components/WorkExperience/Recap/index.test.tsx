import React from "react";
import { render } from "@testing-library/react";
import { RecapWorkExperience } from "../../../recaps.interface";
import WorkExperienceRecap from "./index";

const workExperience: RecapWorkExperience = {
  kind: "Work Experience",
  userId: "userId",
  _id: "workExperienceId",
  bulletPoints: [
    "Worked on the Culdevate start up seriously",
    "Getting better at making REST API endpoints",
    "Improving interviewing and mentoring skills",
  ],
  startDate: new Date("2020/01/17"),
  title: "Lead Software Engineer",
  company: "Culdevate",
  location: "Long Beach, CA",
  employmentType: "Self-Employed",
};

describe("<WorkExperienceRecap />", () => {
  const testId = "workExperienceRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <WorkExperienceRecap
        workExperience={{ ...workExperience, endDate: new Date("2020/03/20") }}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
        className="extra-recap-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show date range to the present if there is no end date", () => {
    const { getByTestId } = render(
      <WorkExperienceRecap
        workExperience={{ ...workExperience }}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
      />,
    );

    expect(getByTestId(testId).textContent).toContain("Present");
  });
});
