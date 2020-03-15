import React from "react";
import { render } from "@testing-library/react";
import AccomplishmentsListCard from "./index";

describe("<AccomplishmentsListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <AccomplishmentsListCard onClick={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
