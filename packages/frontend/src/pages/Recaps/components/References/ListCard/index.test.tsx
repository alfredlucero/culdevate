import React from "react";
import { render } from "@testing-library/react";
import ReferencesListCard from "./index";

describe("<ReferencesListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <ReferencesListCard onClick={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
