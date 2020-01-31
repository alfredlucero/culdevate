import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Alert from "./index";

describe("<Alert />", () => {
  const alertTestId = "alertTestId";

  test("should render without error", () => {
    const { container } = render(
      <div>
        <Alert variant="success" onHide={() => {}} isShowing={true} testId={alertTestId} className="extra-alert-class">
          Success Alert
        </Alert>
        <Alert variant="warning" onHide={() => {}} isShowing={true} testId={alertTestId} className="extra-alert-class">
          Warning Alert
        </Alert>
        <Alert variant="info" onHide={() => {}} isShowing={true} testId={alertTestId} className="extra-alert-class">
          Info Alert
        </Alert>
        <Alert variant="danger" onHide={() => {}} isShowing={true} testId={alertTestId} className="extra-alert-class">
          Danger Alert
        </Alert>
      </div>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should not exist when the alert is not showing", () => {
    const { queryByTestId } = render(
      <Alert variant="success" onHide={() => {}} isShowing={false} testId={alertTestId}>
        Success Alert
      </Alert>,
    );

    expect(queryByTestId(alertTestId)).toBeNull();
  });

  test("should call onHide callback when clicking the alert", () => {
    const onHideMock = jest.fn();
    const { getByTestId } = render(
      <Alert variant="success" onHide={onHideMock} isShowing={true} testId={alertTestId}>
        Success Alert
      </Alert>,
    );

    fireEvent.click(getByTestId(alertTestId));

    expect(onHideMock).toHaveBeenCalled();
  });
});
