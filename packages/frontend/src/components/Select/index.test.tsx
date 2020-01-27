import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select, { SelectOption } from "./index";

describe("<Select />", () => {
  const selectTestId = "selectTestId";
  const selectOptions: SelectOption[] = [
    { label: "Corgi", value: "corgi" },
    { label: "Dachsund", value: "dachsund" },
    { label: "Golden Retriever", value: "golden retriever" },
  ];

  test("should render without error", () => {
    const { container } = render(
      <Select
        id="select"
        value="corgi"
        options={selectOptions}
        onChange={() => {}}
        testId={selectTestId}
        className="extra-select-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render label if present", () => {
    const label = "Select Label";
    const { getByLabelText } = render(
      <Select
        id="select"
        value="corgi"
        options={selectOptions}
        onChange={() => {}}
        testId={selectTestId}
        className="extra-select-class"
        label={label}
        required={true}
      />,
    );

    expect(getByLabelText(label)).toBeVisible();
  });

  test("should render label with optional if present and not required", () => {
    const label = "Select Label";
    const { getByLabelText, getByTestId } = render(
      <Select
        id="select"
        value="corgi"
        options={selectOptions}
        onChange={() => {}}
        testId={selectTestId}
        className="extra-select-class"
        label={label}
        required={false}
      />,
    );
    expect(getByLabelText(`${label} (optional)`)).toBeVisible();
    expect(getByTestId(selectTestId)).not.toBeRequired();
  });

  test("should render inline text info if valid and info present", () => {
    const textInfo = "Some text info";
    const { container } = render(
      <Select
        id="select"
        value="corgi"
        options={selectOptions}
        onChange={() => {}}
        testId={selectTestId}
        className="extra-select-class"
        textInfo={textInfo}
        valid={true}
        errorInfo="Some error info not displayed"
        required={false}
      />,
    );

    expect(container).toHaveTextContent(textInfo);
  });

  test("should render inline error info if invalid and error present", () => {
    const errorInfo = "Error info";
    const { container } = render(
      <Select
        id="select"
        value="corgi"
        options={selectOptions}
        onChange={() => {}}
        testId={selectTestId}
        className="extra-select-class"
        textInfo="Text info not displayed"
        valid={false}
        errorInfo={errorInfo}
        required={false}
      />,
    );

    expect(container).toHaveTextContent(errorInfo);
  });

  test("should render disabled state if disabled", () => {
    const { getByTestId } = render(
      <Select
        id="select"
        value="corgi"
        options={selectOptions}
        onChange={() => {}}
        testId={selectTestId}
        className="extra-select-class"
        disabled={true}
        required={false}
      />,
    );

    expect(getByTestId(selectTestId)).toBeDisabled();
  });

  test("should call onChange callback when firing change event", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Select
        id="select"
        value="corgi"
        options={selectOptions}
        onChange={onChangeMock}
        testId={selectTestId}
        className="extra-select-class"
        required={false}
      />,
    );

    fireEvent.change(getByTestId(selectTestId), { target: { value: "dachsund" } });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
