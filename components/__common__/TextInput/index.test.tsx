import React from "react";
import { render, cleanup } from "react-testing-library";
import TextInput, { TextInputType } from "./index";

afterEach(cleanup);

describe("<TextInput />", () => {
  const requiredTextInputProps = {
    value: "someTextInput",
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
});
