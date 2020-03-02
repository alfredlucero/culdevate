import React from "react";
import { render } from "@testing-library/react";
import SkillsListCard from "./index";

describe("<SkillsListCard />", () => {
  test("should render without error", () => {
    const { container } = render(<SkillsListCard onClick={() => {}} className="extra-list-class" testId="testId" />);

    expect(container).toMatchSnapshot();
  });
});
