import React from "react";
import { render } from "@testing-library/react";
import AllRecapsEmptyCard from "./index";

describe("<AllRecapsEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <AllRecapsEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
