import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import OrganizationsLayout, { OrganizationsLayoutProps } from "./index";
import { RecapOrganizations } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";

const sampleRecapOrganizations: RecapOrganizations = {
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
const defaultProps: OrganizationsLayoutProps = {
  recaps: [sampleRecapOrganizations],
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

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <OrganizationsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapOrganizations));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the Organizations Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <OrganizationsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the Organizations Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });
});
