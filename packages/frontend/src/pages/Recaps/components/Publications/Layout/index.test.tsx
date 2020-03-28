import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import PublicationsLayout, { PublicationsLayoutProps } from "./index";
import { RecapPublications } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";

const sampleRecapPublications: RecapPublications = {
  title: "Mindfulness-based Interventions for those with PTSD",
  kind: "Publications",
  coauthors: "Gingin D.",
  userId: "userId",
  _id: "publicationsId",
  type: "Journal",
  bulletPoints: ["Providing meditation and cognitive behavioral therapy techniques for those with PTSD"],
  publisher: "UCI Psychology",
  startDate: new Date("2020/10/20").toISOString(),
  url: "http://psychology.journal.com",
};
const defaultProps: PublicationsLayoutProps = {
  recaps: [sampleRecapPublications],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<PublicationsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <PublicationsLayout
        {...defaultProps}
        testId="publicationsLayoutTestId"
        className="extra-publications-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<PublicationsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("publicationsRecap")).toBeNull();

    expect(getByTestId("publicationsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<PublicationsLayout {...defaultProps} />);

    expect(queryByTestId("publicationsEmptyCard")).toBeNull();

    expect(getByTestId("publicationsRecap")).toBeVisible();
  });

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <PublicationsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapPublications));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the Publications Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <PublicationsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the Publications Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });
});
