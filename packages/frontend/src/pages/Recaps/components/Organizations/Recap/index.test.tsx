import React from "react";
import { render } from "@testing-library/react";
import { RecapOrganizations } from "../../../recaps.interface";
import OrganizationsRecap from "./index";

const organizations: RecapOrganizations = {
  organizationName: "Zeta Mu Beta",
  positions: "Pledge Educator, Member",
  location: "Long Beach, CA",
  startDate: new Date("2014/12/13").toISOString(),
  endDate: new Date("2016/03/31").toISOString(),
  kind: "Organizations",
  userId: "userId",
  _id: "organizationsId",
  bulletPoints: [
    "Crossed into the organization in Fall 2014",
    "Served as an active member for 2 years and as a pledge educator for the XI class",
  ],
};

describe("<OrganizationsRecap />", () => {
  const testId = "organizationsRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <OrganizationsRecap
        organizations={organizations}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
        className="extra-recap-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show date range to the present if there is no end date", () => {
    const { getByTestId } = render(
      <OrganizationsRecap
        organizations={{
          _id: organizations._id,
          userId: organizations.userId,
          positions: organizations.positions,
          location: organizations.location,
          organizationName: organizations.organizationName,
          startDate: organizations.startDate,
          kind: organizations.kind,
          bulletPoints: organizations.bulletPoints,
        }}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
      />,
    );

    expect(getByTestId(testId).textContent).toContain("Present");
  });
});
