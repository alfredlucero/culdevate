import React from "react";
import { render } from "@testing-library/react";
import PublicationsEmptyCard from "./index";

describe("<PublicationsEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <PublicationsEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
