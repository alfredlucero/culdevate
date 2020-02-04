import React from "react";
import { render } from "@testing-library/react";
import DatePicker from "./index";

describe("<DatePicker />", () => {
  const datePickerTestId = "datePickerTestId";

  test("should render without error", () => {
    const { container } = render(
      <DatePicker
        id="datePicker"
        selected={new Date("2020/02/03")}
        onChange={() => {}}
        className="extra-date-class"
        testId={datePickerTestId}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render label if present", () => {
    const label = "Date Label";
    const { getByLabelText, getByTestId } = render(
      <DatePicker
        id="datePicker"
        selected={new Date("2020/02/03")}
        onChange={() => {}}
        testId={datePickerTestId}
        label={label}
        required={true}
      />,
    );

    expect(getByLabelText(label)).toBeVisible();
    expect(getByTestId(datePickerTestId)).toBeRequired();
  });

  test("should render label with optional if present and not required", () => {
    const label = "Date Label";
    const { getByLabelText, getByTestId } = render(
      <DatePicker
        id="datePicker"
        selected={new Date("2020/02/03")}
        onChange={() => {}}
        testId={datePickerTestId}
        label={label}
        required={false}
      />,
    );

    expect(getByLabelText(`${label} (optional)`)).toBeVisible();
    expect(getByTestId(datePickerTestId)).not.toBeRequired();
  });

  test("should render inline text info if valid and info present", () => {
    const textInfo = "Some text info";
    const { container } = render(
      <DatePicker
        id="datePicker"
        selected={new Date("2020/02/03")}
        onChange={() => {}}
        testId={datePickerTestId}
        textInfo={textInfo}
        errorInfo="Error info"
        valid={true}
      />,
    );

    expect(container).toHaveTextContent(textInfo);
  });

  test("should render inline error info if invalid and error present", () => {
    const errorInfo = "Error info";
    const { container } = render(
      <DatePicker
        id="datePicker"
        selected={new Date("2020/02/03")}
        onChange={() => {}}
        testId={datePickerTestId}
        textInfo="Text info"
        errorInfo={errorInfo}
        valid={false}
      />,
    );

    expect(container).toHaveTextContent(errorInfo);
  });

  test("should render placeholder given nothing selected", () => {
    const placeholder = "Placeholder";
    const { getByPlaceholderText } = render(
      <DatePicker
        id="datePicker"
        selected={null}
        onChange={() => {}}
        testId={datePickerTestId}
        placeholder={placeholder}
      />,
    );

    expect(getByPlaceholderText(placeholder)).toBeVisible();
  });

  test("should render disabled state if disabled", () => {
    const { getByTestId } = render(
      <DatePicker id="datePicker" selected={null} onChange={() => {}} testId={datePickerTestId} disabled={true} />,
    );

    expect(getByTestId(datePickerTestId)).toBeDisabled();
  });
});
