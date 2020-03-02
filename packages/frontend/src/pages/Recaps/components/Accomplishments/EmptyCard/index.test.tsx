import React from "react";
import { render } from "@testing-library/react";
import AccomplishmentsEmptyCard from "./index";

describe("<AccomplishmentsEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <AccomplishmentsEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
