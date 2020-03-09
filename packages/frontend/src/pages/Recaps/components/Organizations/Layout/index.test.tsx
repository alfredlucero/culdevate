import React from "react";
import { render } from "@testing-library/react";
import OrganizationsLayout, { OrganizationsLayoutProps } from "./index";

const defaultProps: OrganizationsLayoutProps = {
  recaps: [
    {
      organizationName: "Zeta Mu Beta",
      positions: "Pledge Educator, Member",
      location: "Long Beach, CA",
      startDate: new Date("2014/12/13"),
      endDate: new Date("2016/03/31"),
      kind: "Organizations",
      userId: "userId",
      _id: "organizationsId",
      bulletPoints: [
        "Crossed into the organization in Fall 2014",
        "Served as an active member for 2 years and as a pledge educator for the XI class",
      ],
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<OrganizationsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <OrganizationsLayout
        {...defaultProps}
        testId="organizationsLayoutTestId"
        className="extra-organizations-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<OrganizationsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("organizationsRecap")).toBeNull();

    expect(getByTestId("organizationsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<OrganizationsLayout {...defaultProps} />);

    expect(queryByTestId("organizationsEmptyCard")).toBeNull();

    expect(getByTestId("organizationsRecap")).toBeVisible();
  });
});
