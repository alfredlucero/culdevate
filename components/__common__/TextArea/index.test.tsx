import React from "react";
import { render, cleanup } from "react-testing-library";
import TextArea from "./index";

afterEach(cleanup);

describe("<TextArea />", () => {
  const requiredTextAreaProps = {
    value: "someTextAreaInput",
    name: "textAreaName",
    valid: true,
    touched: true,
    onChange: () => {},
  };

  test("should render the text area", () => {
    const { container } = render(<TextArea {...requiredTextAreaProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
