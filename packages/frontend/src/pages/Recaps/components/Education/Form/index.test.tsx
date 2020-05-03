import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import EducationForm, { EducationFormProps } from "./index";
import { RecapEducation, RecapKind } from "../../../recaps.interface";
import { MAX_GENERAL_LENGTH, recapEducationErrors as validationErrors } from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapEducation = {
  kind: RecapKind.Education,
  userId: "userId",
  _id: "educationId",
  bulletPoints: [],
  startDate: new Date("2013/10/01").toISOString(),
  endDate: new Date("2017/06/20").toISOString(),
  school: "University of California, Los Angeles",
  location: "Los Angeles, CA",
  degree: "Bachelor of Science",
  fieldOfStudy: "Computer Science",
  grade: "Alumnus",
};
const defaultProps: EducationFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<EducationForm />", () => {
  test("should render without error", () => {
    const { container } = render(
      <EducationForm {...defaultProps} testId="educationFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <EducationForm {...defaultProps} testId="educationFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <EducationForm {...defaultProps} initialRecap={null} testId="educationFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show school required error after blurring with no school", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationSchool), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationSchool));

    const requiredError = await findByText(validationErrors.schoolRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show school max length error after blurring with school beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationSchool), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.educationSchool));

    const maxLengthError = await findByText(validationErrors.schoolMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show school without inline error after blurring with valid school", async () => {
    const { getByLabelText, findByText, queryByText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationSchool), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationSchool));

    const requiredError = await findByText(validationErrors.schoolRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.educationSchool), { target: { value: "school" } });
    fireEvent.blur(getByLabelText(RecapFields.educationSchool));

    expect(queryByText(validationErrors.schoolRequired)).toBeNull();
  });

  test("should show location required error after blurring with no location", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationLocation), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationLocation));

    const requiredError = await findByText(validationErrors.locationRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show location max length error after blurring with location beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationLocation), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.educationLocation));

    const maxLengthError = await findByText(validationErrors.locationMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show location without inline error after blurring with valid location", async () => {
    const { getByLabelText, findByText, queryByText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationLocation), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationLocation));

    const requiredError = await findByText(validationErrors.locationRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.educationLocation), { target: { value: "location" } });
    fireEvent.blur(getByLabelText(RecapFields.educationLocation));

    expect(queryByText(validationErrors.locationRequired)).toBeNull();
  });

  test("should show degree required error after blurring with no degree", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationDegree), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationDegree));

    const requiredError = await findByText(validationErrors.degreeRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show degree max length error after blurring with degree beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationDegree), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.educationDegree));

    const maxLengthError = await findByText(validationErrors.degreeMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show degree without inline error after blurring with valid degree", async () => {
    const { getByLabelText, findByText, queryByText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationDegree), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationDegree));

    const requiredError = await findByText(validationErrors.degreeRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.educationDegree), { target: { value: "degree" } });
    fireEvent.blur(getByLabelText(RecapFields.educationDegree));

    expect(queryByText(validationErrors.degreeRequired)).toBeNull();
  });

  test("should show field of study required error after blurring with no field of study", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationFieldOfStudy), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationFieldOfStudy));

    const requiredError = await findByText(validationErrors.fieldOfStudyRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show field of study max length error after blurring with field of study beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationFieldOfStudy), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.educationFieldOfStudy));

    const maxLengthError = await findByText(validationErrors.fieldOfStudyMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show field of study without inline error after blurring with valid field of study", async () => {
    const { getByLabelText, findByText, queryByText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationFieldOfStudy), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationFieldOfStudy));

    const requiredError = await findByText(validationErrors.fieldOfStudyRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.educationFieldOfStudy), { target: { value: "field of study" } });
    fireEvent.blur(getByLabelText(RecapFields.educationFieldOfStudy));

    expect(queryByText(validationErrors.fieldOfStudyRequired)).toBeNull();
  });

  test("should show grade required error after blurring with no grade", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationGrade), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationGrade));

    const requiredError = await findByText(validationErrors.gradeRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show grade max length error after blurring with grade beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationGrade), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.educationGrade));

    const maxLengthError = await findByText(validationErrors.gradeMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show grade without inline error after blurring with valid grade", async () => {
    const { getByLabelText, findByText, queryByText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.educationGrade), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.educationGrade));

    const requiredError = await findByText(validationErrors.gradeRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.educationGrade), { target: { value: "grade" } });
    fireEvent.blur(getByLabelText(RecapFields.educationGrade));

    expect(queryByText(validationErrors.gradeRequired)).toBeNull();
  });

  test("should show start date and end date if current work is not checked", () => {
    const { getByLabelText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    expect((getByLabelText("I currently study here") as HTMLInputElement).checked).toBe(false);

    expect(getByLabelText(RecapFields.startDate)).toBeVisible();
    expect(getByLabelText(RecapFields.endDate)).toBeVisible();
  });

  test("should hide end date if current work is checked", async () => {
    const { getByLabelText, queryByLabelText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    expect((getByLabelText("I currently study here") as HTMLInputElement).checked).toBe(false);

    fireEvent.click(getByLabelText("I currently study here"));

    expect((getByLabelText("I currently study here") as HTMLInputElement).checked).toBe(true);

    expect(getByLabelText(RecapFields.startDate)).toBeVisible();
    expect(queryByLabelText(RecapFields.endDate)).toBeNull();
  });

  test("should show invalid date range error after blurring with start date coming after end date", async () => {
    const { getByLabelText, findAllByText, getByTestId } = render(
      <EducationForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    const invalidDateRangeError = await findAllByText(validationErrors.dateRangeInvalid);

    expect(invalidDateRangeError).toBeTruthy();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show start date required error after blurring with no start date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    const startDateRequiredError = await findByText(validationErrors.startDateInvalid);

    expect(startDateRequiredError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show end date required error after blurring with no end date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    const endDateRequiredError = await findByText(validationErrors.endDateInvalid);

    expect(endDateRequiredError).toBeVisible();
    expect(getByTestId("educationSaveButton")).toBeDisabled();
  });

  test("should show start date and end date without inline error after blurring with valid date range", () => {
    const { getByLabelText, queryByText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(queryByText(validationErrors.dateRangeInvalid)).toBeNull();
  });

  test("should show start date without inline error with current work checked after blurring valid start date", async () => {
    const { getByLabelText, findByText, queryByText } = render(<EducationForm {...defaultProps} initialRecap={null} />);

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
    const { getByText } = render(<EducationForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<EducationForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("educationSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("educationSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(<EducationForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("educationSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("educationSaveButton"));

    await findByText("Something went wrong with updating a Education Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
