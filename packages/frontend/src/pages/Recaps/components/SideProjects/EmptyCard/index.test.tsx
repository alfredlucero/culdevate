import React from "react";
import { render } from "@testing-library/react";
import SideProjectsEmptyCard from "./index";

describe("<SideProjectsEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SideProjectsEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
