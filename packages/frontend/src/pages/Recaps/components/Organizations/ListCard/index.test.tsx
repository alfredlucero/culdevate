import React from "react";
import { render } from "@testing-library/react";
import OrganizationsListCard from "./index";

describe("<OrganizationsListCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <OrganizationsListCard onClick={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
