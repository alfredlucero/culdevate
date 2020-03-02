import React from "react";
import { render } from "@testing-library/react";
import WorkExperienceEmptyCard from "./index";

describe("<WorkExperienceEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <WorkExperienceEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
