import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import OrganizationsLayout, { OrganizationsLayoutProps } from "./index";
import { RecapOrganizations, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const sampleRecapOrganizations: RecapOrganizations = {
  organizationName: "Zeta Mu Beta",
  positions: "Pledge Educator, Member",
  location: "Long Beach, CA",
  startDate: new Date("2014/12/13").toISOString(),
  endDate: new Date("2016/03/31").toISOString(),
  kind: RecapKind.Organizations,
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

  test("should show the success alert after creating a recap successfully", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <OrganizationsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Organizations Recap");
    expect(createModal).toBeVisible();

    const recap: RecapOrganizations = {
      organizationName: "Zeta Mu Beta",
      positions: "Pledge Educator, Member",
      location: "Long Beach, CA",
      startDate: new Date("2014/12/13").toISOString(),
      endDate: new Date("2016/03/31").toISOString(),
      kind: RecapKind.Organizations,
      userId: "userId",
      _id: "organizationsId",
      bulletPoints: [],
    };

    fireEvent.change(getByLabelText(RecapFields.organizationsName), { target: { value: recap.organizationName } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsName));

    fireEvent.change(getByLabelText(RecapFields.organizationsLocation), { target: { value: recap.location } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsLocation));

    fireEvent.change(getByLabelText(RecapFields.organizationsPositions), { target: { value: recap.positions } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsPositions));

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "12/2014" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "03/2016" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(getByTestId("organizationsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.resolve(recap));

    fireEvent.click(getByTestId("organizationsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Create a Organizations Recap"));

    expect(onCreateRecapSuccessMock).toHaveBeenCalled();
    expect(queryByText("You have successfully created a Organizations Recap!")).toBeVisible();
  });

  test("should show the error alert after failing to create a recap", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId } = render(
      <OrganizationsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Organizations Recap");
    expect(createModal).toBeVisible();

    const recap: RecapOrganizations = {
      organizationName: "Zeta Mu Beta",
      positions: "Pledge Educator, Member",
      location: "Long Beach, CA",
      startDate: new Date("2014/12/13").toISOString(),
      endDate: new Date("2016/03/31").toISOString(),
      kind: RecapKind.Organizations,
      userId: "userId",
      _id: "organizationsId",
      bulletPoints: [],
    };

    fireEvent.change(getByLabelText(RecapFields.organizationsName), { target: { value: recap.organizationName } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsName));

    fireEvent.change(getByLabelText(RecapFields.organizationsLocation), { target: { value: recap.location } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsLocation));

    fireEvent.change(getByLabelText(RecapFields.organizationsPositions), { target: { value: recap.positions } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsPositions));

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "12/2014" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "03/2016" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(getByTestId("organizationsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("organizationsSaveButton"));

    const createErrorAlert = await findByText("Something went wrong with adding a Organizations Recap!", {
      exact: false,
    });

    expect(createErrorAlert).toBeVisible();
    expect(getByText("Create a Organizations Recap")).toBeVisible();
    expect(onCreateRecapSuccessMock).not.toHaveBeenCalled();
  });

  test("should show the success alert after updating a recap successfully", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <OrganizationsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Organizations Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("organizationsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapOrganizations));

    fireEvent.click(getByTestId("organizationsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Edit your Organizations Recap"));

    expect(queryByText("You have successfully updated a Organizations Recap!")).toBeVisible();
    expect(onUpdateRecapSuccessMock).toHaveBeenCalled();
  });

  test("should show the error alert after failing to update a recap", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <OrganizationsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Organizations Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("organizationsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("organizationsSaveButton"));

    const updateErrorAlert = await findByText("Something went wrong with updating a Organizations Recap!", {
      exact: false,
    });
    expect(updateErrorAlert).toBeVisible();

    expect(queryByText("Edit your Organizations Recap")).toBeVisible();
    expect(onUpdateRecapSuccessMock).not.toHaveBeenCalled();
  });
});
