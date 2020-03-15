import React from "react";
import { render } from "@testing-library/react";
import WorkExperienceLayout, { WorkExperienceLayoutProps } from "./index";

const defaultProps: WorkExperienceLayoutProps = {
  recaps: [
    {
      kind: "Work Experience",
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
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<WorkExperienceLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <WorkExperienceLayout
        {...defaultProps}
        testId="workExperienceLayoutTestId"
        className="extra-work-experience-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<WorkExperienceLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("workExperienceRecap")).toBeNull();

    expect(getByTestId("workExperienceEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<WorkExperienceLayout {...defaultProps} />);

    expect(queryByTestId("workExperienceEmptyCard")).toBeNull();

    expect(getByTestId("workExperienceRecap")).toBeVisible();
  });
});
