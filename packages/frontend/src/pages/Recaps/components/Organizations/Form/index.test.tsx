import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import OrganizationsForm, { OrganizationsFormProps } from "./index";
import { RecapOrganizations, RecapKind } from "../../../recaps.interface";
import { MAX_GENERAL_LENGTH, recapOrganizationsErrors as validationErrors } from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapOrganizations = {
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
const defaultProps: OrganizationsFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<OrganizationsForm />", () => {
  test("should render without error", () => {
    const { container } = render(
      <OrganizationsForm {...defaultProps} testId="organizationsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <OrganizationsForm {...defaultProps} testId="organizationsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <OrganizationsForm
        {...defaultProps}
        initialRecap={null}
        testId="organizationsFormTestId"
        className="extra-class-name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show name required error after blurring with no name", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsName), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsName));

    const requiredError = await findByText(validationErrors.nameRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show name max length error after blurring with name beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsName), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.organizationsName));

    const maxLengthError = await findByText(validationErrors.nameMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show name without inline error after blurring with valid name", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsName), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsName));

    const requiredError = await findByText(validationErrors.nameRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.organizationsName), { target: { value: "name" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsName));

    expect(queryByText(validationErrors.nameRequired)).toBeNull();
  });

  test("should show positions required error after blurring with no positions", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsPositions), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsPositions));

    const requiredError = await findByText(validationErrors.positionsRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show positions max length error after blurring with positions beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsPositions), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.organizationsPositions));

    const maxLengthError = await findByText(validationErrors.positionsMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show positions without inline error after blurring with valid positions", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsPositions), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsPositions));

    const requiredError = await findByText(validationErrors.positionsRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.organizationsPositions), { target: { value: "positions" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsPositions));

    expect(queryByText(validationErrors.positionsRequired)).toBeNull();
  });

  test("should show location required error after blurring with no location", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsLocation), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsLocation));

    const requiredError = await findByText(validationErrors.locationRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show location max length error after blurring with location beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsLocation), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.organizationsLocation));

    const maxLengthError = await findByText(validationErrors.locationMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show location without inline error after blurring with valid location", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.organizationsLocation), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsLocation));

    const requiredError = await findByText(validationErrors.locationRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.organizationsLocation), { target: { value: "location" } });
    fireEvent.blur(getByLabelText(RecapFields.organizationsLocation));

    expect(queryByText(validationErrors.locationRequired)).toBeNull();
  });

  test("should show start date and end date if currently active is not checked", () => {
    const { getByLabelText } = render(<OrganizationsForm {...defaultProps} initialRecap={null} />);

    expect((getByLabelText("I am currently an active member") as HTMLInputElement).checked).toBe(false);

    expect(getByLabelText(RecapFields.startDate)).toBeVisible();
    expect(getByLabelText(RecapFields.endDate)).toBeVisible();
  });

  test("should hide end date if currently active is checked", async () => {
    const { getByLabelText, queryByLabelText } = render(<OrganizationsForm {...defaultProps} initialRecap={null} />);

    expect((getByLabelText("I am currently an active member") as HTMLInputElement).checked).toBe(false);

    fireEvent.click(getByLabelText("I am currently an active member"));

    expect((getByLabelText("I am currently an active member") as HTMLInputElement).checked).toBe(true);

    expect(getByLabelText(RecapFields.startDate)).toBeVisible();
    expect(queryByLabelText(RecapFields.endDate)).toBeNull();
  });

  test("should show invalid date range error after blurring with start date coming after end date", async () => {
    const { getByLabelText, findAllByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    const invalidDateRangeError = await findAllByText(validationErrors.dateRangeInvalid);

    expect(invalidDateRangeError).toBeTruthy();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show start date required error after blurring with no start date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    const startDateRequiredError = await findByText(validationErrors.startDateInvalid);

    expect(startDateRequiredError).toBeVisible();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show end date required error after blurring with no end date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    const endDateRequiredError = await findByText(validationErrors.endDateInvalid);

    expect(endDateRequiredError).toBeVisible();
    expect(getByTestId("organizationsSaveButton")).toBeDisabled();
  });

  test("should show start date and end date without inline error after blurring with valid date range", () => {
    const { getByLabelText, queryByText } = render(<OrganizationsForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(queryByText(validationErrors.dateRangeInvalid)).toBeNull();
  });

  test("should show start date without inline error with current work checked after blurring valid start date", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <OrganizationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    const startDateRequiredError = await findByText(validationErrors.startDateInvalid);
    expect(startDateRequiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    expect(queryByText(validationErrors.startDateInvalid)).toBeNull();
  });

  test("should call onHide after clicking Cancel button", () => {
    const onHideMock = jest.fn();
    const { getByText } = render(<OrganizationsForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<OrganizationsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("organizationsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("organizationsSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(
      <OrganizationsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />,
    );

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("organizationsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("organizationsSaveButton"));

    await findByText("Something went wrong with updating a Organizations Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
