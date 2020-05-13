import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ReferencesForm, { ReferencesFormProps } from "./index";
import { RecapReferences, RecapKind } from "../../../recaps.interface";
import { MAX_GENERAL_LENGTH, recapReferencesErrors as validationErrors } from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapReferences = {
  title: "Andrew C. - Product Manager",
  kind: RecapKind.References,
  userId: "userId",
  _id: "referencesId",
  company: "Sandia National Laboratories",
  bulletPoints: [],
  phoneNumber: "555-555-5555",
  email: "ac@sandia.test",
};
const defaultProps: ReferencesFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<ReferencesForm />", () => {
  test("should render without error", () => {
    const { container } = render(
      <ReferencesForm {...defaultProps} testId="referencesFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <ReferencesForm {...defaultProps} testId="referencesFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <ReferencesForm
        {...defaultProps}
        initialRecap={null}
        testId="referencesFormTestId"
        className="extra-class-name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show title required error after blurring with no title", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.referencesTitle));

    const requiredError = await findByText(validationErrors.titleRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("referencesSaveButton")).toBeDisabled();
  });

  test("should show title max length error after blurring with title beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesTitle), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.referencesTitle));

    const maxLengthError = await findByText(validationErrors.titleMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("referencesSaveButton")).toBeDisabled();
  });

  test("should show title without inline error after blurring with valid title", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.referencesTitle));

    const requiredError = await findByText(validationErrors.titleRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.referencesTitle), { target: { value: "title" } });
    fireEvent.blur(getByLabelText(RecapFields.referencesTitle));

    expect(queryByText(validationErrors.titleRequired)).toBeNull();
  });

  test("should show company required error after blurring with no company", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesCompany), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.referencesCompany));

    const requiredError = await findByText(validationErrors.companyRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("referencesSaveButton")).toBeDisabled();
  });

  test("should show company max length error after blurring with company beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesCompany), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.referencesCompany));

    const maxLengthError = await findByText(validationErrors.companyMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("referencesSaveButton")).toBeDisabled();
  });

  test("should show company without inline error after blurring with valid company", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesCompany), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.referencesCompany));

    const requiredError = await findByText(validationErrors.companyRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.referencesCompany), { target: { value: "company" } });
    fireEvent.blur(getByLabelText(RecapFields.referencesCompany));

    expect(queryByText(validationErrors.companyRequired)).toBeNull();
  });

  test("should show email max length error after blurring with email beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesEmail), {
      target: { value: "email@test.com" + "a".repeat(MAX_GENERAL_LENGTH) },
    });
    fireEvent.blur(getByLabelText(RecapFields.referencesEmail));

    const maxLengthError = await findByText(validationErrors.emailMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("referencesSaveButton")).toBeDisabled();
  });

  test("should show email invalid syntax error after blurring with invalid email", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesEmail), {
      target: { value: "invalidemail" },
    });
    fireEvent.blur(getByLabelText(RecapFields.referencesEmail));

    const invalidEmailError = await findByText(validationErrors.emailInvalid);

    expect(invalidEmailError).toBeVisible();
    expect(getByTestId("referencesSaveButton")).toBeDisabled();
  });

  test("should show email without inline error given valid/empty email", async () => {
    const { getByLabelText, queryByText } = render(<ReferencesForm {...defaultProps} initialRecap={null} />);

    expect(queryByText(validationErrors.emailInvalid)).toBeNull();

    fireEvent.change(getByLabelText(RecapFields.referencesEmail), {
      target: { value: "validemail@test.com" },
    });
    fireEvent.blur(getByLabelText(RecapFields.referencesEmail));

    expect(queryByText(validationErrors.emailInvalid)).toBeNull();
  });

  test("should show phone number max length error after blurring with phone number beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ReferencesForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.referencesPhoneNumber), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.referencesPhoneNumber));

    const maxLengthError = await findByText(validationErrors.phoneNumberMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("referencesSaveButton")).toBeDisabled();
  });

  test("should show phone number without inline error given valid/empty phone number", async () => {
    const { getByLabelText, queryByText } = render(<ReferencesForm {...defaultProps} initialRecap={null} />);

    expect(queryByText(validationErrors.phoneNumberMaxLength)).toBeNull();

    fireEvent.change(getByLabelText(RecapFields.referencesPhoneNumber), {
      target: { value: "555-555-5555" },
    });
    fireEvent.blur(getByLabelText(RecapFields.referencesPhoneNumber));

    expect(queryByText(validationErrors.phoneNumberMaxLength)).toBeNull();
  });

  test("should call onHide after clicking Cancel button", () => {
    const onHideMock = jest.fn();
    const { getByText } = render(<ReferencesForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<ReferencesForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("referencesSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("referencesSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(<ReferencesForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("referencesSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("referencesSaveButton"));

    await findByText("Something went wrong with updating a References Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
