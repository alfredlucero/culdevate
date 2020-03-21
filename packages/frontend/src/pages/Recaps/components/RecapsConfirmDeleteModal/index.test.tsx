import React from "react";
import { render } from "@testing-library/react";
import RecapsConfirmDeleteModal from "./index";

describe("<RecapsConfirmDeleteModal />", () => {
  test("should render without error", () => {
    const { container } = render(
      <RecapsConfirmDeleteModal
        isShowing={true}
        onClickConfirmDelete={() => {}}
        onHide={() => {}}
        isProcessingDelete={false}
        testId="confirmDeleteModal"
        className="extra-modal-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
