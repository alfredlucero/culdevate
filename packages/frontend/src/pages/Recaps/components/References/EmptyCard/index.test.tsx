import React from "react";
import { render } from "@testing-library/react";
import ReferencesEmptyCard from "./index";

describe("<ReferencesEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <ReferencesEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
