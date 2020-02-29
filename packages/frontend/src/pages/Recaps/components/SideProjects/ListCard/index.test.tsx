import React from "react";
import { render } from "@testing-library/react";
import SideProjectsListCard from "./index";

describe("<SideProjectsListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SideProjectsListCard
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
