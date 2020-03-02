import React from "react";
import { render } from "@testing-library/react";
import OtherEmptyCard from "./index";

describe("<OtherEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(<OtherEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />);

    expect(container).toMatchSnapshot();
  });
});
