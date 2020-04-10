import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FullScreenModal from "./index";

describe("<FullScreenModal />", () => {
  const fullScreenModalTestId = "fullScreenModalTestId";

  test("should render without error", () => {
    const { container } = render(
      <FullScreenModal isShowing={true} onHide={() => {}} testId={fullScreenModalTestId} className="center-modal">
        Modal
      </FullScreenModal>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should not exist when the full screen modal is not showing", () => {
    const { queryByTestId } = render(
      <FullScreenModal isShowing={false} onHide={() => {}} testId={fullScreenModalTestId}>
        Modal
      </FullScreenModal>,
    );

    expect(queryByTestId(fullScreenModalTestId)).toBeNull();
  });

  test("should call onHide callback when clicking the close icon button", () => {
    const onHideMock = jest.fn();
    const { getByTestId } = render(
      <FullScreenModal isShowing={true} onHide={onHideMock} testId={fullScreenModalTestId}>
        Modal
      </FullScreenModal>,
    );

    fireEvent.click(getByTestId("fullScreenModalCloseButton"));

    expect(onHideMock).toHaveBeenCalled();
  });
});
