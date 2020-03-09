import React from "react";
import { render } from "@testing-library/react";
import SkillsLayout, { SkillsLayoutProps } from "./index";

const defaultProps: SkillsLayoutProps = {
  recaps: [
    {
      title: "Tagalog",
      kind: "Skills",
      userId: "userId",
      _id: "skillsId",
      proficiency: "Intermediate",
      bulletPoints: [
        "Not a fluent speaker but can understand every day Tagalog speaking well",
        "Can speak some Tagalog here and there but struggle with grammar",
      ],
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<SkillsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SkillsLayout {...defaultProps} testId="skillsLayoutTestId" className="extra-skills-layout-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<SkillsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("skillsRecap")).toBeNull();

    expect(getByTestId("skillsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<SkillsLayout {...defaultProps} />);

    expect(queryByTestId("skillsEmptyCard")).toBeNull();

    expect(getByTestId("skillsRecap")).toBeVisible();
  });
});
