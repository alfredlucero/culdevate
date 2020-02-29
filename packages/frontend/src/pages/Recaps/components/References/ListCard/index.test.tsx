import React from "react";
import { render } from "@testing-library/react";
import ReferencesListCard from "./index";

describe("<ReferencesListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <ReferencesListCard
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
