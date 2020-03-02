import React from "react";
import { render } from "@testing-library/react";
import EducationEmptyCard from "./index";

describe("<EducationEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <EducationEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
