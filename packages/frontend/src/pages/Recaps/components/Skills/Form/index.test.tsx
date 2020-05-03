import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SkillsForm, { SkillsFormProps } from "./index";
import { RecapSkills, RecapKind } from "../../../recaps.interface";
import { MAX_GENERAL_LENGTH, recapSkillsErrors as validationErrors } from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapSkills = {
  title: "Tagalog",
  kind: RecapKind.Skills,
  userId: "userId",
  _id: "skillsId",
  proficiency: "Intermediate",
  bulletPoints: [],
};
const defaultProps: SkillsFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<SkillsForm />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SkillsForm {...defaultProps} testId="skillsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <SkillsForm {...defaultProps} testId="skillsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <SkillsForm {...defaultProps} initialRecap={null} testId="skillsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show title required error after blurring with no title", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<SkillsForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.skillsTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.skillsTitle));

    const requiredError = await findByText(validationErrors.titleRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("skillsSaveButton")).toBeDisabled();
  });

  test("should show title max length error after blurring with title beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(<SkillsForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.skillsTitle), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.skillsTitle));

    const maxLengthError = await findByText(validationErrors.titleMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("skillsSaveButton")).toBeDisabled();
  });

  test("should show title without inline error after blurring with valid title", async () => {
    const { getByLabelText, findByText, queryByText } = render(<SkillsForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.skillsTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.skillsTitle));

    const requiredError = await findByText(validationErrors.titleRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.skillsTitle), { target: { value: "title" } });
    fireEvent.blur(getByLabelText(RecapFields.skillsTitle));

    expect(queryByText(validationErrors.titleRequired)).toBeNull();
  });

  test("should call onHide after clicking Cancel button", () => {
    const onHideMock = jest.fn();
    const { getByText } = render(<SkillsForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<SkillsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("skillsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("skillsSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(<SkillsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("skillsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("skillsSaveButton"));

    await findByText("Something went wrong with updating a Skills Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
