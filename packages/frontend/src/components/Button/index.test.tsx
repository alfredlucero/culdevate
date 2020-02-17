import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("<Button />", () => {
  const buttonTestId = "buttonTestId";

  test("should render primary variant without error", () => {
    const { container } = render(
      <Button variant="primary" type="button" testId={buttonTestId} className="extra-button-class" onClick={() => {}}>
        Primary Button
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render secondary variant without error", () => {
    const { container } = render(
      <Button variant="secondary" type="submit" testId={buttonTestId} className="extra-button-class" onClick={() => {}}>
        Secondary Button
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render danger variant without error", () => {
    const { container } = render(
      <Button variant="danger" type="reset" testId={buttonTestId} className="extra-button-class" onClick={() => {}}>
        Danger Button
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render loading state without error", () => {
    const { container } = render(
      <Button
        variant="primary"
        type="button"
        loading={true}
        testId={buttonTestId}
        className="extra-button-class"
        onClick={() => {}}
      >
        Primary Loading Button
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render disabled state when disabled", () => {
    const { getByTestId } = render(
      <Button variant="primary" type="button" testId={buttonTestId} onClick={() => {}} disabled={true}>
        Disabled Button
      </Button>,
    );

    expect(getByTestId(buttonTestId)).toBeDisabled();
  });

  test("should trigger onClick when click event is fired", () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(
      <Button variant="primary" type="button" testId={buttonTestId} onClick={onClickMock}>
        Primary Button
      </Button>,
    );

    fireEvent.click(getByTestId(buttonTestId), { button: 0 });

    expect(onClickMock).toHaveBeenCalled();
  });
});
