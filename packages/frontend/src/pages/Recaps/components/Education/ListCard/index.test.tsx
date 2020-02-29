import React from "react";
import { render } from "@testing-library/react";
import EducationListCard from "./index";

describe("<EducationListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <EducationListCard
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
