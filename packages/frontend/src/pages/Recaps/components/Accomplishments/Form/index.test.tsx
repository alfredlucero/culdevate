import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AccomplishmentsForm, { AccomplishmentsFormProps } from "./index";
import { RecapAccomplishments, RecapKind } from "../../../recaps.interface";
import { MAX_GENERAL_LENGTH, recapAccomplishmentsErrors as validationErrors } from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapAccomplishments = {
  title: "Promoted to Software Engineer 2 at SendGrid",
  kind: RecapKind.Accomplishments,
  userId: "userId",
  _id: "accomplishmentsId",
  type: "Career",
  bulletPoints: [],
  startDate: new Date("2018/10/20").toISOString(),
};
const defaultProps: AccomplishmentsFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<AccomplishmentsForm />", () => {
  test("should render without error", () => {
    const { container } = render(
      <AccomplishmentsForm {...defaultProps} testId="accomplishmentsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <AccomplishmentsForm {...defaultProps} testId="accomplishmentsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <AccomplishmentsForm
        {...defaultProps}
        initialRecap={null}
        testId="accomplishmentsFormTestId"
        className="extra-class-name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show title required error after blurring with no title", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <AccomplishmentsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsTitle));

    const requiredError = await findByText(validationErrors.titleRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("accomplishmentsSaveButton")).toBeDisabled();
  });

  test("should show title max length error after blurring with title beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <AccomplishmentsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsTitle), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsTitle));

    const maxLengthError = await findByText(validationErrors.titleMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("accomplishmentsSaveButton")).toBeDisabled();
  });

  test("should show title without inline error after blurring with valid title", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <AccomplishmentsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsTitle));

    const requiredError = await findByText(validationErrors.titleRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsTitle), { target: { value: "title" } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsTitle));

    expect(queryByText(validationErrors.titleRequired)).toBeNull();
  });

  test("should show date required error after blurring with no date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <AccomplishmentsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.accomplishmentsDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.accomplishmentsDate));

    const startDateRequiredError = await findByText(validationErrors.dateInvalid);

    expect(startDateRequiredError).toBeVisible();
    expect(getByTestId("accomplishmentsSaveButton")).toBeDisabled();
  });

  test("should call onHide after clicking Cancel button", () => {
    const onHideMock = jest.fn();
    const { getByText } = render(<AccomplishmentsForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<AccomplishmentsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("accomplishmentsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("accomplishmentsSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(
      <AccomplishmentsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />,
    );

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("accomplishmentsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("accomplishmentsSaveButton"));

    await findByText("Something went wrong with updating a Accomplishments Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
