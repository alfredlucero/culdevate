import React from "react";
import { render } from "@testing-library/react";
import WorkExperienceListCard from "./index";

describe("<WorkExperienceListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <WorkExperienceListCard
        onClickAdd={() => {}}
        onClickView={() => {}}
        count={10}
        className="extra-list-class"
        testId="testId"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
