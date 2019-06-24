import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import TextInput, { TextInputType } from "./index";

afterEach(cleanup);

describe("<TextInput />", () => {
  const requiredTextInputProps = {
    value: "someTextInput",
    id: "some-text-input-id",
    name: "textInputName",
    valid: true,
    touched: true,
    type: "text" as TextInputType,
    onChange: () => {},
  };

  test("should render the text input", () => {
    const { container } = render(<TextInput {...requiredTextInputProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render info message given valid text area", () => {
    const infoMessage = "Some info";
    const { getByTestId, queryByTestId } = render(
      <TextInput
        {...requiredTextInputProps}
        infoMessage={infoMessage}
        errorMessage="Some error message"
        required={false}
      />,
    );

    expect(queryByTestId("textInputError")).toBeNull();
    expect(getByTestId("textInputInfo")).toHaveTextContent(infoMessage);
  });

  test("should render error message given invalid text input", () => {
    const errorMessage = "Some error";
    const { getByTestId, queryByTestId } = render(
      <TextInput {...requiredTextInputProps} infoMessage="Some info" errorMessage={errorMessage} valid={false} />,
    );

    expect(queryByTestId("textInputInfo")).toBeNull();
    expect(getByTestId("textInputError")).toHaveTextContent(errorMessage);
  });

  test("should render proper required label given a required text input with label", () => {
    const label = "Some label";
    const expectedLabel = `${label} (Required)`;
    const { queryByLabelText } = render(<TextInput {...requiredTextInputProps} label={label} required={true} />);

    expect(queryByLabelText(expectedLabel)).toBeTruthy();
  });
});
