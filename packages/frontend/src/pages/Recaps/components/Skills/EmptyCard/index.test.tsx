import React from "react";
import { render } from "@testing-library/react";
import SkillsEmptyCard from "./index";

describe("<SkillsEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SkillsEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
