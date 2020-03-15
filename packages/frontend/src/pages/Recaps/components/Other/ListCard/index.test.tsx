import React from "react";
import { render } from "@testing-library/react";
import OtherListCard from "./index";

describe("<OtherListCard />", () => {
  test("should render without error", () => {
    const { container } = render(<OtherListCard onClick={() => {}} className="extra-list-class" testId="testId" />);

    expect(container).toMatchSnapshot();
  });
});
