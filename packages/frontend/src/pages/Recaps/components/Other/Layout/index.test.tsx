import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import OtherLayout, { OtherLayoutProps } from "./index";
import { RecapOther, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";

const sampleRecapOther: RecapOther = {
  title: "Finished reading Clean Code book!",
  kind: RecapKind.Other,
  userId: "userId",
  _id: "otherId",
  startDate: new Date("2017/10/20").toISOString(),
  endDate: new Date("2017/12/20").toISOString(),
  bulletPoints: ["Learned about how to write cleaner and more maintainable code", "Improved with code reviews"],
};
const defaultProps: OtherLayoutProps = {
  recaps: [sampleRecapOther],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<OtherLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <OtherLayout {...defaultProps} testId="otherLayoutTestId" className="extra-other-layout-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<OtherLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("otherRecap")).toBeNull();

    expect(getByTestId("otherEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<OtherLayout {...defaultProps} />);

    expect(queryByTestId("otherEmptyCard")).toBeNull();

    expect(getByTestId("otherRecap")).toBeVisible();
  });

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <OtherLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapOther));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the Other Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <OtherLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the Other Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });
});
