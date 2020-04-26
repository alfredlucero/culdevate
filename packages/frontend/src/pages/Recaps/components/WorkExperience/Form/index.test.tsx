import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import WorkExperienceForm, { WorkExperienceFormProps } from "./index";
import { RecapWorkExperience, RecapKind } from "../../../recaps.interface";
import { MAX_GENERAL_LENGTH, recapWorkExperienceErrors as validationErrors } from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";

const initialRecap: RecapWorkExperience = {
  kind: RecapKind.WorkExperience,
  userId: "userId",
  _id: "workExperienceId",
  bulletPoints: [
    "Worked on the Culdevate start up seriously",
    "Getting better at making REST API endpoints",
    "Improving interviewing and mentoring skills",
  ],
  startDate: new Date("2020/01/17").toISOString(),
  title: "Lead Software Engineer",
  company: "Culdevate",
  location: "Long Beach, CA",
  employmentType: "Self-Employed",
};
const defaultProps: WorkExperienceFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<WorkExperienceForm />", () => {
  test("should render without error", () => {
    const { container } = render(
      <WorkExperienceForm {...defaultProps} testId="workExperienceFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <WorkExperienceForm {...defaultProps} testId="workExperienceFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <WorkExperienceForm
        {...defaultProps}
        initialRecap={null}
        testId="workExperienceFormTestId"
        className="extra-class-name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show work title required error after blurring with no work title", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Work Title"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("Work Title"));

    const requiredError = await findByText(validationErrors.titleRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show work title max length error after blurring with work title beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Work Title"), { target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) } });
    fireEvent.blur(getByLabelText("Work Title"));

    const maxLengthError = await findByText(validationErrors.titleMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show work title without inline error after blurring with valid work title", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Work Title"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("Work Title"));

    const requiredError = await findByText(validationErrors.titleRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText("Work Title"), { target: { value: "worktitle" } });
    fireEvent.blur(getByLabelText("Work Title"));

    expect(queryByText(validationErrors.titleRequired)).toBeNull();
  });

  test("should show company required error after blurring with no company", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Company"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("Company"));

    const requiredError = await findByText(validationErrors.companyRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show company max length error after blurring with company beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Company"), { target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) } });
    fireEvent.blur(getByLabelText("Company"));

    const maxLengthError = await findByText(validationErrors.companyMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show company without inline error after blurring with valid company", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Company"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("Company"));

    const requiredError = await findByText(validationErrors.companyRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText("Company"), { target: { value: "workcompany" } });
    fireEvent.blur(getByLabelText("Company"));

    expect(queryByText(validationErrors.companyRequired)).toBeNull();
  });

  test("should show location required error after blurring with no location", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Location"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("Location"));

    const requiredError = await findByText(validationErrors.locationRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show location max length error after blurring with location beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Location"), { target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) } });
    fireEvent.blur(getByLabelText("Location"));

    const maxLengthError = await findByText(validationErrors.locationMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show location without inline error after blurring with valid location", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Location"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("Location"));

    const requiredError = await findByText(validationErrors.locationRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText("Location"), { target: { value: "worklocation" } });
    fireEvent.blur(getByLabelText("Location"));

    expect(queryByText(validationErrors.locationRequired)).toBeNull();
  });

  test("should show start date and end date if current work is not checked", () => {
    const { getByLabelText } = render(<WorkExperienceForm {...defaultProps} initialRecap={null} />);

    expect((getByLabelText("I currently work here") as HTMLInputElement).checked).toBe(false);

    expect(getByLabelText("Start Date")).toBeVisible();
    expect(getByLabelText("End Date")).toBeVisible();
  });

  test("should hide end date if current work is checked", async () => {
    const { getByLabelText, queryByLabelText } = render(<WorkExperienceForm {...defaultProps} initialRecap={null} />);

    expect((getByLabelText("I currently work here") as HTMLInputElement).checked).toBe(false);

    fireEvent.click(getByLabelText("I currently work here"));

    expect((getByLabelText("I currently work here") as HTMLInputElement).checked).toBe(true);

    expect(getByLabelText("Start Date")).toBeVisible();
    expect(queryByLabelText("End Date")).toBeNull();
  });

  test("should show invalid date range error after blurring with start date coming after end date", async () => {
    const { getByLabelText, findAllByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Start Date"), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText("Start Date"));

    fireEvent.change(getByLabelText("End Date"), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText("End Date"));

    const invalidDateRangeError = await findAllByText(validationErrors.dateRangeInvalid);

    expect(invalidDateRangeError).toBeTruthy();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show start date required error after blurring with no start date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Start Date"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("Start Date"));

    const startDateRequiredError = await findByText(validationErrors.startDateInvalid);

    expect(startDateRequiredError).toBeVisible();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show end date required error after blurring with no end date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("End Date"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("End Date"));

    const endDateRequiredError = await findByText(validationErrors.endDateInvalid);

    expect(endDateRequiredError).toBeVisible();
    expect(getByTestId("workExperienceSaveButton")).toBeDisabled();
  });

  test("should show start date and end date without inline error after blurring with valid date range", () => {
    const { getByLabelText, queryByText } = render(<WorkExperienceForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText("Start Date"), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText("Start Date"));

    fireEvent.change(getByLabelText("End Date"), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText("End Date"));

    expect(queryByText(validationErrors.dateRangeInvalid)).toBeNull();
  });

  test("should show start date without inline error with current work checked after blurring valid start date", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <WorkExperienceForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText("Start Date"), { target: { value: "" } });
    fireEvent.blur(getByLabelText("Start Date"));

    const startDateRequiredError = await findByText(validationErrors.startDateInvalid);
    expect(startDateRequiredError).toBeVisible();

    fireEvent.change(getByLabelText("Start Date"), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText("Start Date"));

    expect(queryByText(validationErrors.startDateInvalid)).toBeNull();
  });

  test("should call onHide after clicking Cancel button", () => {
    const onHideMock = jest.fn();
    const { getByText } = render(<WorkExperienceForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<WorkExperienceForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("workExperienceSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("workExperienceSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(
      <WorkExperienceForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />,
    );

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("workExperienceSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("workExperienceSaveButton"));

    await findByText("Something went wrong with updating a Work Experience Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
