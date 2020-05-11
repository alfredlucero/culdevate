import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SideProjectsForm, { SideProjectsFormProps } from "./index";
import { RecapSideProjects, RecapKind } from "../../../recaps.interface";
import { MAX_GENERAL_LENGTH, recapSideProjectsErrors as validationErrors } from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapSideProjects = {
  title: "Zeta Mu Beta Website",
  creators: "Alfred Lucero and Regine Deguzman",
  startDate: new Date("2016/11/01").toISOString(),
  endDate: new Date("2016/12/31").toISOString(),
  kind: RecapKind.SideProjects,
  userId: "userId",
  _id: "sideProjectsId",
  bulletPoints: [],
};
const defaultProps: SideProjectsFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<SideProjectsForm />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SideProjectsForm {...defaultProps} testId="sideProjectsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <SideProjectsForm {...defaultProps} testId="sideProjectsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <SideProjectsForm
        {...defaultProps}
        initialRecap={null}
        testId="sideProjectsFormTestId"
        className="extra-class-name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show title required error after blurring with no title", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.sideProjectsTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsTitle));

    const requiredError = await findByText(validationErrors.titleRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("sideProjectsSaveButton")).toBeDisabled();
  });

  test("should show title max length error after blurring with title beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.sideProjectsTitle), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsTitle));

    const maxLengthError = await findByText(validationErrors.titleMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("sideProjectsSaveButton")).toBeDisabled();
  });

  test("should show title without inline error after blurring with valid title", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.sideProjectsTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsTitle));

    const requiredError = await findByText(validationErrors.titleRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.sideProjectsTitle), { target: { value: "worktitle" } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsTitle));

    expect(queryByText(validationErrors.titleRequired)).toBeNull();
  });

  test("should show creators required error after blurring with no creators", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.sideProjectsCreators), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsCreators));

    const requiredError = await findByText(validationErrors.creatorsRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("sideProjectsSaveButton")).toBeDisabled();
  });

  test("should show creators max length error after blurring with creators beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.sideProjectsCreators), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsCreators));

    const maxLengthError = await findByText(validationErrors.creatorsMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("sideProjectsSaveButton")).toBeDisabled();
  });

  test("should show creators without inline error after blurring with valid creators", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.sideProjectsCreators), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsCreators));

    const requiredError = await findByText(validationErrors.creatorsRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.sideProjectsCreators), { target: { value: "workcreators" } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsCreators));

    expect(queryByText(validationErrors.creatorsRequired)).toBeNull();
  });

  test("should show start date and end date if current work is not checked", () => {
    const { getByLabelText } = render(<SideProjectsForm {...defaultProps} initialRecap={null} />);

    expect((getByLabelText("I am currently working on this") as HTMLInputElement).checked).toBe(false);

    expect(getByLabelText(RecapFields.startDate)).toBeVisible();
    expect(getByLabelText(RecapFields.endDate)).toBeVisible();
  });

  test("should hide end date if current work is checked", async () => {
    const { getByLabelText, queryByLabelText } = render(<SideProjectsForm {...defaultProps} initialRecap={null} />);

    expect((getByLabelText("I am currently working on this") as HTMLInputElement).checked).toBe(false);

    fireEvent.click(getByLabelText("I am currently working on this"));

    expect((getByLabelText("I am currently working on this") as HTMLInputElement).checked).toBe(true);

    expect(getByLabelText(RecapFields.startDate)).toBeVisible();
    expect(queryByLabelText(RecapFields.endDate)).toBeNull();
  });

  test("should show invalid date range error after blurring with start date coming after end date", async () => {
    const { getByLabelText, findAllByText, getByTestId } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    const invalidDateRangeError = await findAllByText(validationErrors.dateRangeInvalid);

    expect(invalidDateRangeError).toBeTruthy();
    expect(getByTestId("sideProjectsSaveButton")).toBeDisabled();
  });

  test("should show start date required error after blurring with no start date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    const startDateRequiredError = await findByText(validationErrors.startDateInvalid);

    expect(startDateRequiredError).toBeVisible();
    expect(getByTestId("sideProjectsSaveButton")).toBeDisabled();
  });

  test("should show end date required error after blurring with no end date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    const endDateRequiredError = await findByText(validationErrors.endDateInvalid);

    expect(endDateRequiredError).toBeVisible();
    expect(getByTestId("sideProjectsSaveButton")).toBeDisabled();
  });

  test("should show start date and end date without inline error after blurring with valid date range", () => {
    const { getByLabelText, queryByText } = render(<SideProjectsForm {...defaultProps} initialRecap={null} />);

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(queryByText(validationErrors.dateRangeInvalid)).toBeNull();
  });

  test("should show start date without inline error with current work checked after blurring valid start date", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <SideProjectsForm {...defaultProps} initialRecap={null} />,
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
    const { getByText } = render(<SideProjectsForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<SideProjectsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("sideProjectsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("sideProjectsSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(
      <SideProjectsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />,
    );

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("sideProjectsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("sideProjectsSaveButton"));

    await findByText("Something went wrong with updating a Side Projects Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
