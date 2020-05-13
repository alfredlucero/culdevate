import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import ReferencesLayout, { ReferencesLayoutProps } from "./index";
import { RecapReferences, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const sampleRecapReferences: RecapReferences = {
  title: "Andrew C. - Product Manager",
  kind: RecapKind.References,
  userId: "userId",
  _id: "referencesId",
  company: "Sandia National Laboratories",
  bulletPoints: [
    "Worked under Andrew in building a Node.js, MongoDB, Neo4J bitcoin transaction visualization and classification prototype with D3.js sankey flows",
    "Mentored by Ethan C. and worked with Steven R. in building out the frontend and parts of the backend",
  ],
  phoneNumber: "555-555-5555",
  email: "ac@sandia.gov",
};
const defaultProps: ReferencesLayoutProps = {
  recaps: [sampleRecapReferences],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<ReferencesLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <ReferencesLayout {...defaultProps} testId="referencesLayoutTestId" className="extra-references-layout-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<ReferencesLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("referencesRecap")).toBeNull();

    expect(getByTestId("referencesEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<ReferencesLayout {...defaultProps} />);

    expect(queryByTestId("referencesEmptyCard")).toBeNull();

    expect(getByTestId("referencesRecap")).toBeVisible();
  });

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <ReferencesLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapReferences));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the References Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <ReferencesLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the References Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });

  test("should show the success alert after creating a recap successfully", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <ReferencesLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a References Recap");
    expect(createModal).toBeVisible();

    const recap: RecapReferences = {
      title: "Andrew",
      kind: RecapKind.References,
      userId: "userId",
      _id: "referencesId",
      company: "Sandia National Laboratories",
      bulletPoints: [],
      phoneNumber: "555-555-5555",
      email: "ac@sandia.test",
    };

    fireEvent.change(getByLabelText(RecapFields.referencesTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.referencesTitle));

    fireEvent.change(getByLabelText(RecapFields.referencesCompany), { target: { value: recap.company } });
    fireEvent.blur(getByLabelText(RecapFields.referencesCompany));

    fireEvent.change(getByLabelText(RecapFields.referencesEmail), { target: { value: recap.email } });
    fireEvent.blur(getByLabelText(RecapFields.referencesEmail));

    fireEvent.change(getByLabelText(RecapFields.referencesPhoneNumber), { target: { value: recap.phoneNumber } });
    fireEvent.blur(getByLabelText(RecapFields.referencesPhoneNumber));

    expect(getByTestId("referencesSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.resolve(recap));

    fireEvent.click(getByTestId("referencesSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Create a References Recap"));

    expect(onCreateRecapSuccessMock).toHaveBeenCalled();
    expect(queryByText("You have successfully created a References Recap!")).toBeVisible();
  });

  test("should show the error alert after failing to create a recap", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId } = render(
      <ReferencesLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a References Recap");
    expect(createModal).toBeVisible();

    const recap: RecapReferences = {
      title: "Andrew",
      kind: RecapKind.References,
      userId: "userId",
      _id: "referencesId",
      company: "Sandia National Laboratories",
      bulletPoints: [],
      phoneNumber: "555-555-5555",
      email: "ac@sandia.test",
    };

    fireEvent.change(getByLabelText(RecapFields.referencesTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.referencesTitle));

    fireEvent.change(getByLabelText(RecapFields.referencesCompany), { target: { value: recap.company } });
    fireEvent.blur(getByLabelText(RecapFields.referencesCompany));

    fireEvent.change(getByLabelText(RecapFields.referencesEmail), { target: { value: recap.email } });
    fireEvent.blur(getByLabelText(RecapFields.referencesEmail));

    fireEvent.change(getByLabelText(RecapFields.referencesPhoneNumber), { target: { value: recap.phoneNumber } });
    fireEvent.blur(getByLabelText(RecapFields.referencesPhoneNumber));

    expect(getByTestId("referencesSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("referencesSaveButton"));

    const createErrorAlert = await findByText("Something went wrong with adding a References Recap!", {
      exact: false,
    });

    expect(createErrorAlert).toBeVisible();
    expect(getByText("Create a References Recap")).toBeVisible();
    expect(onCreateRecapSuccessMock).not.toHaveBeenCalled();
  });

  test("should show the success alert after updating a recap successfully", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <ReferencesLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your References Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("referencesSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapReferences));

    fireEvent.click(getByTestId("referencesSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Edit your References Recap"));

    expect(queryByText("You have successfully updated a References Recap!")).toBeVisible();
    expect(onUpdateRecapSuccessMock).toHaveBeenCalled();
  });

  test("should show the error alert after failing to update a recap", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <ReferencesLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your References Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("referencesSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("referencesSaveButton"));

    const updateErrorAlert = await findByText("Something went wrong with updating a References Recap!", {
      exact: false,
    });
    expect(updateErrorAlert).toBeVisible();

    expect(queryByText("Edit your References Recap")).toBeVisible();
    expect(onUpdateRecapSuccessMock).not.toHaveBeenCalled();
  });
});
