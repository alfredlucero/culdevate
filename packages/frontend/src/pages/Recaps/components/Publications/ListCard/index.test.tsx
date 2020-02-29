import React from "react";
import { render } from "@testing-library/react";
import PublicationsListCard from "./index";

describe("<PublicationsListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <PublicationsListCard
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
