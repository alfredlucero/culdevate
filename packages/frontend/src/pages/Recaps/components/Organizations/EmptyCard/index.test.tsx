import React from "react";
import { render } from "@testing-library/react";
import OrganizationsEmptyCard from "./index";

describe("<OrganizationsEmptyCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <OrganizationsEmptyCard onClickAdd={() => {}} className="extra-list-class" testId="testId" />,
    );

    expect(container).toMatchSnapshot();
  });
});
