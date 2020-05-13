import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import OtherForm, { OtherFormProps } from "./index";
import { RecapOther, RecapKind } from "../../../recaps.interface";
import { MAX_GENERAL_LENGTH, recapOtherErrors as validationErrors } from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapOther = {
  title: "Finished reading Clean Code book!",
  kind: RecapKind.Other,
  userId: "userId",
  _id: "otherId",
  startDate: new Date("2017/10/20").toISOString(),
  endDate: new Date("2017/12/20").toISOString(),
  bulletPoints: [],
};
const defaultProps: OtherFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<OtherForm />", () => {
  test("should render without error", () => {
    const { container } = render(<OtherForm {...defaultProps} testId="otherFormTestId" className="extra-class-name" />);

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(<OtherForm {...defaultProps} testId="otherFormTestId" className="extra-class-name" />);

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <OtherForm {...defaultProps} initialRecap={null} testId="otherFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show title required error after blurring with no title", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<OtherForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.otherTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.otherTitle));

    const requiredError = await findByText(validationErrors.titleRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("otherSaveButton")).toBeDisabled();
  });

  test("should show title max length error after blurring with title beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<OtherForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.otherTitle), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.otherTitle));

    const maxLengthError = await findByText(validationErrors.titleMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("otherSaveButton")).toBeDisabled();
  });

  test("should show title without inline error after blurring with valid title", async () => {
    const { getByLabelText, findByText, queryByText } = render(<OtherForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.otherTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.otherTitle));

    const requiredError = await findByText(validationErrors.titleRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.otherTitle), { target: { value: "worktitle" } });
    fireEvent.blur(getByLabelText(RecapFields.otherTitle));

    expect(queryByText(validationErrors.titleRequired)).toBeNull();
  });

  test("should show invalid date range error after blurring with start date coming after end date", async () => {
    const { getByLabelText, findAllByText, getByTestId } = render(<OtherForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    const invalidDateRangeError = await findAllByText(validationErrors.dateRangeInvalid);

    expect(invalidDateRangeError).toBeTruthy();
    expect(getByTestId("otherSaveButton")).toBeDisabled();
  });

  test("should show start date required error after blurring with no start date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<OtherForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    const startDateRequiredError = await findByText(validationErrors.startDateInvalid);

    expect(startDateRequiredError).toBeVisible();
    expect(getByTestId("otherSaveButton")).toBeDisabled();
  });

  test("should show end date required error after blurring with no end date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<OtherForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    const endDateRequiredError = await findByText(validationErrors.endDateInvalid);

    expect(endDateRequiredError).toBeVisible();
    expect(getByTestId("otherSaveButton")).toBeDisabled();
  });

  test("should show start date and end date without inline error after blurring with valid date range", () => {
    const { getByLabelText, queryByText } = render(<OtherForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(queryByText(validationErrors.dateRangeInvalid)).toBeNull();
  });

  test("should call onHide after clicking Cancel button", () => {
    const onHideMock = jest.fn();
    const { getByText } = render(<OtherForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<OtherForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("otherSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("otherSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(<OtherForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("otherSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("otherSaveButton"));

    await findByText("Something went wrong with updating a Other Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
