import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Alert from "./index";

describe("<Alert />", () => {
  const alertTestId = "alertTestId";

  test("should render without error", () => {
    const { container } = render(
      <div>
        <Alert variant="success" onClose={() => {}} isVisible={true} testId={alertTestId} className="extra-alert-class">
          Success Alert
        </Alert>
        <Alert variant="warning" onClose={() => {}} isVisible={true} testId={alertTestId} className="extra-alert-class">
          Warning Alert
        </Alert>
        <Alert variant="info" onClose={() => {}} isVisible={true} testId={alertTestId} className="extra-alert-class">
          Info Alert
        </Alert>
        <Alert variant="danger" onClose={() => {}} isVisible={true} testId={alertTestId} className="extra-alert-class">
          Danger Alert
        </Alert>
      </div>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should not exist when the alert is not visible", () => {
    const { queryByTestId } = render(
      <Alert variant="success" onClose={() => {}} isVisible={false} testId={alertTestId}>
        Success Alert
      </Alert>,
    );

    expect(queryByTestId(alertTestId)).toBeNull();
  });

  test("should call onClose callback when clicking the alert", () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Alert variant="success" onClose={onCloseMock} isVisible={true} testId={alertTestId}>
        Success Alert
      </Alert>,
    );

    fireEvent.click(getByTestId(alertTestId));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
