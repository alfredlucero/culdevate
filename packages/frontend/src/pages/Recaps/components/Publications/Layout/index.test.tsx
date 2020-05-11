import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import PublicationsLayout, { PublicationsLayoutProps } from "./index";
import { RecapPublications, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const sampleRecapPublications: RecapPublications = {
  title: "Mindfulness-based Interventions for those with PTSD",
  kind: RecapKind.Publications,
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

  test("should show the success alert after creating a recap successfully", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <PublicationsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Publications Recap");
    expect(createModal).toBeVisible();

    const recap: RecapPublications = {
      title: "Mindfulness-based Interventions for those with PTSD",
      kind: RecapKind.Publications,
      coauthors: "Gingin D.",
      userId: "userId",
      _id: "publicationsId",
      type: "Journal",
      bulletPoints: [],
      publisher: "UCI Psychology",
      startDate: new Date("2020/10/20").toISOString(),
      url: "http://psychology.journal.com",
    };

    fireEvent.change(getByLabelText(RecapFields.publicationsTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsTitle));

    fireEvent.change(getByLabelText(RecapFields.publicationsCoauthors), { target: { value: recap.coauthors } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsCoauthors));

    fireEvent.change(getByLabelText(RecapFields.publicationsPublisher), { target: { value: recap.publisher } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsPublisher));

    fireEvent.change(getByLabelText(RecapFields.publicationsUrl, { exact: false }), { target: { value: recap.url } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsUrl, { exact: false }));

    fireEvent.change(getByLabelText(RecapFields.publicationsDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsDate));

    expect(getByTestId("publicationsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.resolve(recap));

    fireEvent.click(getByTestId("publicationsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Create a Publications Recap"));

    expect(onCreateRecapSuccessMock).toHaveBeenCalled();
    expect(queryByText("You have successfully created a Publications Recap!")).toBeVisible();
  });

  test("should show the error alert after failing to create a recap", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId } = render(
      <PublicationsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Publications Recap");
    expect(createModal).toBeVisible();

    const recap: RecapPublications = {
      title: "Mindfulness-based Interventions for those with PTSD",
      kind: RecapKind.Publications,
      coauthors: "Gingin D.",
      userId: "userId",
      _id: "publicationsId",
      type: "Journal",
      bulletPoints: [],
      publisher: "UCI Psychology",
      startDate: new Date("2020/10/20").toISOString(),
      url: "http://psychology.journal.com",
    };

    fireEvent.change(getByLabelText(RecapFields.publicationsTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsTitle));

    fireEvent.change(getByLabelText(RecapFields.publicationsCoauthors), { target: { value: recap.coauthors } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsCoauthors));

    fireEvent.change(getByLabelText(RecapFields.publicationsPublisher), { target: { value: recap.publisher } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsPublisher));

    fireEvent.change(getByLabelText(RecapFields.publicationsUrl, { exact: false }), { target: { value: recap.url } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsUrl, { exact: false }));

    fireEvent.change(getByLabelText(RecapFields.publicationsDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsDate));

    expect(getByTestId("publicationsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("publicationsSaveButton"));

    const createErrorAlert = await findByText("Something went wrong with adding a Publications Recap!", {
      exact: false,
    });

    expect(createErrorAlert).toBeVisible();
    expect(getByText("Create a Publications Recap")).toBeVisible();
    expect(onCreateRecapSuccessMock).not.toHaveBeenCalled();
  });

  test("should show the success alert after updating a recap successfully", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <PublicationsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Publications Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("publicationsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapPublications));

    fireEvent.click(getByTestId("publicationsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Edit your Publications Recap"));

    expect(queryByText("You have successfully updated a Publications Recap!")).toBeVisible();
    expect(onUpdateRecapSuccessMock).toHaveBeenCalled();
  });

  test("should show the error alert after failing to update a recap", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <PublicationsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Publications Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("publicationsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("publicationsSaveButton"));

    const updateErrorAlert = await findByText("Something went wrong with updating a Publications Recap!", {
      exact: false,
    });
    expect(updateErrorAlert).toBeVisible();

    expect(queryByText("Edit your Publications Recap")).toBeVisible();
    expect(onUpdateRecapSuccessMock).not.toHaveBeenCalled();
  });
});
