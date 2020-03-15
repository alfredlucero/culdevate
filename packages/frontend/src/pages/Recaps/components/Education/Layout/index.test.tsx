import React from "react";
import { render } from "@testing-library/react";
import EducationLayout, { EducationLayoutProps } from "./index";

const defaultProps: EducationLayoutProps = {
  recaps: [
    {
      kind: "Education",
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
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<EducationLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <EducationLayout {...defaultProps} testId="educationLayoutTestId" className="extra-education-layout-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<EducationLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("educationRecap")).toBeNull();

    expect(getByTestId("educationEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<EducationLayout {...defaultProps} />);

    expect(queryByTestId("educationEmptyCard")).toBeNull();

    expect(getByTestId("educationRecap")).toBeVisible();
  });
});
