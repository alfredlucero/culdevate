import React from "react";
import { render } from "@testing-library/react";
import OrganizationsListCard from "./index";

describe("<OrganizationsListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <OrganizationsListCard
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
