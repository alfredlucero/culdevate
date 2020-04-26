import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import ReferencesLayout, { ReferencesLayoutProps } from "./index";
import { RecapReferences, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";

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
});
