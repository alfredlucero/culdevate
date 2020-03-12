import React from "react";
import { render } from "@testing-library/react";
import { RecapEducation } from "../../../recaps.interface";
import EducationRecap from "./index";

const education: RecapEducation = {
  kind: "Education",
  userId: "userId",
  _id: "educationId",
  bulletPoints: [
    "Upsilon Pi Epsilon Computer Science Honor Society",
    "Alpha Phi Sigma Honor Society",
    "Daily Bruin Web Development Intern",
  ],
  startDate: new Date("2013/10/01"),
  endDate: new Date("2017/06/20"),
  school: "University of California, Los Angeles",
  location: "Los Angeles, CA",
  degree: "Bachelor of Science",
  fieldOfStudy: "Computer Science",
  grade: "Alumnus",
};

describe("<EducationRecap />", () => {
  const testId = "educationRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <EducationRecap
        education={education}
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
      <EducationRecap
        education={{
          _id: education._id,
          kind: education.kind,
          userId: education.userId,
          startDate: education.startDate,
          bulletPoints: education.bulletPoints,
          school: education.school,
          location: education.location,
          degree: education.degree,
          fieldOfStudy: education.fieldOfStudy,
          grade: education.grade,
        }}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
      />,
    );

    expect(getByTestId(testId).textContent).toContain("Present");
  });
});
