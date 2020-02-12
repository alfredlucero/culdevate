import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BulletPointInput from "./index";

describe("<BulletPointInput />", () => {
  const bulletPointInputTestId = "bulletPointInputTestId";

  test("should render without error", () => {
    const { container } = render(
      <BulletPointInput
        onChange={() => {}}
        onBlur={() => {}}
        onDelete={() => {}}
        id="bulletpointid"
        value="bullet point description"
        valid={true}
        errorInfo=""
        testId={bulletPointInputTestId}
        className="extraBulletPointClass"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should display inline error given invalid input and errors", () => {
    const errorInfo = "Bullet point is invalid";
    const { getByTestId } = render(
      <BulletPointInput
        onChange={() => {}}
        onBlur={() => {}}
        onDelete={() => {}}
        id="bulletpointid"
        value="invalid bullet point"
        valid={false}
        errorInfo={errorInfo}
        testId={bulletPointInputTestId}
      />,
    );

    expect(getByTestId(bulletPointInputTestId).textContent).toContain(errorInfo);
  });

  test("should not display inline error given valid input", () => {
    const errorInfo = "Bullet point is invalid";
    const { getByTestId } = render(
      <BulletPointInput
        onChange={() => {}}
        onBlur={() => {}}
        onDelete={() => {}}
        id="bulletpointid"
        value="valid bullet point"
        valid={true}
        errorInfo="Error info"
        testId={bulletPointInputTestId}
      />,
    );

    expect(getByTestId(bulletPointInputTestId).textContent).not.toContain(errorInfo);
  });

  test("should call onDelete when clicking the input's delete icon", () => {
    const onDeleteMock = jest.fn();
    const { getByTestId } = render(
      <BulletPointInput
        onChange={() => {}}
        onBlur={() => {}}
        onDelete={onDeleteMock}
        id="bulletpointid"
        value="valid bullet point"
        valid={true}
        errorInfo="Error info"
        testId={bulletPointInputTestId}
      />,
    );

    fireEvent.click(getByTestId(`${bulletPointInputTestId}DeleteIcon`));

    expect(onDeleteMock).toHaveBeenCalled();
  });
});
