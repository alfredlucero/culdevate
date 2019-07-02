import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import TextArea from "./index";

afterEach(cleanup);

describe("<TextArea />", () => {
  const requiredTextAreaProps = {
    id: "some-text-area-id",
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

  test("should render info message given valid text area", () => {
    const infoMessage = "Some info";
    const { getByTestId, queryByTestId } = render(
      <TextArea
        {...requiredTextAreaProps}
        infoMessage={infoMessage}
        errorMessage="Some error message"
        required={false}
      />,
    );

    expect(queryByTestId("textAreaError")).toBeNull();
    expect(getByTestId("textAreaInfo")).toHaveTextContent(infoMessage);
  });

  test("should render error message given invalid text area", () => {
    const errorMessage = "Some error";
    const { getByTestId, queryByTestId } = render(
      <TextArea {...requiredTextAreaProps} infoMessage="Some info" errorMessage={errorMessage} valid={false} />,
    );

    expect(queryByTestId("textAreaInfo")).toBeNull();
    expect(getByTestId("textAreaError")).toHaveTextContent(errorMessage);
  });

  test("should render proper required label given a required text area with label", () => {
    const label = "Some label";
    const expectedLabel = `${label} (Required)`;
    const { queryByLabelText } = render(<TextArea {...requiredTextAreaProps} label={label} required={true} />);

    expect(queryByLabelText(expectedLabel)).toBeTruthy();
  });
});
