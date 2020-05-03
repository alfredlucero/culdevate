import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import AccomplishmentsLayout, { AccomplishmentsLayoutProps } from "./index";
import { RecapAccomplishments, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const sampleRecapAccomplishments: RecapAccomplishments = {
  title: "Promoted to Software Engineer 2 at SendGrid",
  kind: RecapKind.Accomplishments,
  userId: "userId",
  _id: "accomplishmentsId",
  type: "Career",
  bulletPoints: [
    "Led migration of manual frontend deployments and hosting on on-prem nginx servers to AWS S3 and CloudFront with Terraform and Buildkite for CICD",
    "Contributed to the development and pushed the final release of the redesigned Email Activity in Backbone/Marionette",
    "Led the transition from an in-house Ruby Selenium solution to WebdriverIO and finally to Cypress for E2E tests",
  ],
  startDate: new Date("2018/10/20").toISOString(),
};
const defaultProps: AccomplishmentsLayoutProps = {
  recaps: [sampleRecapAccomplishments],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<AccomplishmentsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <AccomplishmentsLayout
        {...defaultProps}
        testId="accomplishmentsLayoutTestId"
        className="extra-accomplishments-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<AccomplishmentsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("accomplishmentsRecap")).toBeNull();

    expect(getByTestId("accomplishmentsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<AccomplishmentsLayout {...defaultProps} />);

    expect(queryByTestId("accomplishmentsEmptyCard")).toBeNull();

    expect(getByTestId("accomplishmentsRecap")).toBeVisible();
  });

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <AccomplishmentsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapAccomplishments));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the Accomplishments Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <AccomplishmentsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the Accomplishments Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });

  test("should show the success alert after creating a recap successfully", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <AccomplishmentsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Accomplishments Recap");
    expect(createModal).toBeVisible();

    const recap: RecapAccomplishments = {
      title: "Promoted to Software Engineer 2 at SendGrid",
      kind: RecapKind.Accomplishments,
      userId: "userId",
      _id: "accomplishmentsId",
      type: "Career",
      bulletPoints: [],
      startDate: new Date("2018/10/20").toISOString(),
    };

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsTitle));

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsType), { target: { value: recap.type } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsType));

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsDate), { target: { value: "2018/10/20" } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsDate));

    expect(getByTestId("accomplishmentsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.resolve(recap));

    fireEvent.click(getByTestId("accomplishmentsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Create a Accomplishments Recap"));

    expect(onCreateRecapSuccessMock).toHaveBeenCalled();
    expect(queryByText("You have successfully created a Accomplishments Recap!")).toBeVisible();
  });

  test("should show the error alert after failing to create a recap", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId } = render(
      <AccomplishmentsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Accomplishments Recap");
    expect(createModal).toBeVisible();

    const recap: RecapAccomplishments = {
      title: "Promoted to Software Engineer 2 at SendGrid",
      kind: RecapKind.Accomplishments,
      userId: "userId",
      _id: "accomplishmentsId",
      type: "Career",
      bulletPoints: [],
      startDate: new Date("2018/10/20").toISOString(),
    };

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsTitle));

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsType), { target: { value: recap.type } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsType));

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsDate), { target: { value: "2018/10/20" } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsDate));

    expect(getByTestId("accomplishmentsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("accomplishmentsSaveButton"));

    const createErrorAlert = await findByText("Something went wrong with adding a Accomplishments Recap!", {
      exact: false,
    });

    expect(createErrorAlert).toBeVisible();
    expect(getByText("Create a Accomplishments Recap")).toBeVisible();
    expect(onCreateRecapSuccessMock).not.toHaveBeenCalled();
  });

  test("should show the success alert after updating a recap successfully", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <AccomplishmentsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Accomplishments Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("accomplishmentsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapAccomplishments));

    fireEvent.click(getByTestId("accomplishmentsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Edit your Accomplishments Recap"));

    expect(queryByText("You have successfully updated a Accomplishments Recap!")).toBeVisible();
    expect(onUpdateRecapSuccessMock).toHaveBeenCalled();
  });

  test("should show the error alert after failing to update a recap", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <AccomplishmentsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Accomplishments Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("accomplishmentsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("accomplishmentsSaveButton"));

    const updateErrorAlert = await findByText("Something went wrong with updating a Accomplishments Recap!", {
      exact: false,
    });
    expect(updateErrorAlert).toBeVisible();

    expect(queryByText("Edit your Accomplishments Recap")).toBeVisible();
    expect(onUpdateRecapSuccessMock).not.toHaveBeenCalled();
  });
});
