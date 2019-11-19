import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextInput from "./index";

describe("<TextInput />", () => {
  const inputTestId = "inputTestId";

  test("should render without error", () => {
    const { container } = render(
      <TextInput
        id="text-input-id"
        value="value"
        type="text"
        onChange={() => {}}
        testId={inputTestId}
        className="extra-input-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render label if present", () => {
    const label = "Input Label";
    const { getByLabelText } = render(
      <TextInput id="text-input-id" value="value" type="text" onChange={() => {}} testId={inputTestId} label={label} />,
    );

    expect(getByLabelText(label)).toBeVisible();
  });

  test("should render required label if present and required", () => {
    const label = "Input Label";
    const { getByLabelText, getByTestId } = render(
      <TextInput
        id="text-input-id"
        value="value"
        type="text"
        onChange={() => {}}
        testId={inputTestId}
        label={label}
        required={true}
      />,
    );

    expect(getByLabelText(`${label} (required)`)).toBeVisible();
    expect(getByTestId(inputTestId)).toBeRequired();
  });

  test("should render inline text info if valid and info present", () => {
    const textInfo = "Some Text Info";
    const { container } = render(
      <TextInput
        id="text-input-id"
        value="value"
        type="text"
        onChange={() => {}}
        testId={inputTestId}
        textInfo={textInfo}
        errorInfo="Some error info"
        valid={true}
      />,
    );

    expect(container).toHaveTextContent(textInfo);
  });

  test("should render inline error info if invalid and error present", () => {
    const errorInfo = "Error Info";
    const { container, getByTestId } = render(
      <TextInput
        id="text-input-id"
        value="value"
        type="text"
        onChange={() => {}}
        testId={inputTestId}
        textInfo="Text Info"
        errorInfo={errorInfo}
        valid={false}
      />,
    );

    expect(container).toHaveTextContent(errorInfo);
  });

  test("should render placeholder given no value", () => {
    const placeholder = "Some placeholder...";
    const { getByPlaceholderText } = render(
      <TextInput
        id="text-input-id"
        value=""
        type="text"
        onChange={() => {}}
        testId={inputTestId}
        placeholder={placeholder}
      />,
    );

    expect(getByPlaceholderText(placeholder)).toBeVisible();
  });

  test("should render disabled state if disabled", () => {
    const { getByTestId } = render(
      <TextInput id="text-input-id" value="" type="text" onChange={() => {}} testId={inputTestId} disabled={true} />,
    );

    expect(getByTestId(inputTestId)).toBeDisabled();
  });

  test("should call onChange callback when firing change event", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <TextInput
        id="text-input-id"
        value="value"
        type="text"
        onChange={onChangeMock}
        testId={inputTestId}
        className="extra-input-class"
      />,
    );

    fireEvent.change(getByTestId(inputTestId), { target: { value: "changedValue" } });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
