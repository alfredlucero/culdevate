import React from "react";
import { render } from "@testing-library/react";
import { RecapSkills, RecapKind } from "../../../recaps.interface";
import SkillsRecap from "./index";

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

describe("<SkillsRecap />", () => {
  const testId = "skillsRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <SkillsRecap
        skills={skills}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
        className="extra-recap-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
