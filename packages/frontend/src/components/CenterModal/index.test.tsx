import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CenterModal from "./index";

describe("<CenterModal />", () => {
  const centerModalTestId = "centerModalTestId";

  test("should render without error", () => {
    const { container } = render(
      <CenterModal isShowing={true} onHide={() => {}} testId={centerModalTestId} className="center-modal">
        Modal
      </CenterModal>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should not exist when the center modal is not showing", () => {
    const { queryByTestId } = render(
      <CenterModal isShowing={false} onHide={() => {}} testId={centerModalTestId}>
        Modal
      </CenterModal>,
    );

    expect(queryByTestId(centerModalTestId)).toBeNull();
  });

  test("should call onHide callback when clicking the center modal's overlay", () => {
    const onHideMock = jest.fn();
    const { getByTestId } = render(
      <CenterModal isShowing={true} onHide={onHideMock} testId={centerModalTestId}>
        Modal
      </CenterModal>,
    );

    fireEvent.click(getByTestId("centerModalOverlay"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onHide callback when clicking the close icon button", () => {
    const onHideMock = jest.fn();
    const { getByTestId } = render(
      <CenterModal isShowing={true} onHide={onHideMock} testId={centerModalTestId}>
        Modal
      </CenterModal>,
    );

    fireEvent.click(getByTestId("centerModalCloseButton"));

    expect(onHideMock).toHaveBeenCalled();
  });
});
