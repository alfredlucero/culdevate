import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import AccomplishmentsLayout, { AccomplishmentsLayoutProps } from "./index";
import { RecapAccomplishments, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";

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
});
