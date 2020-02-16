import React from "react";
import ReactDOM from "react-dom";
import { CommonProps } from "../commonProps";

export interface CenterModalProps extends CommonProps {
  isShowing: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

const CenterModal: React.FC<CenterModalProps> = ({
  isShowing,
  onHide,
  children,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  if (!isShowing) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center${
        className !== "" ? ` ${className}` : ""
      }`}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <div
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 z-40"
        data-testid="centerModalOverlay"
        onClick={onHide}
      />
      <div
        className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-content py-4 px-6">
          <div className="modal-header w-full flex justify-end">
            <svg
              className="fill-current h-6 w-6 text-gray-700"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onHide}
              data-testid="centerModalCloseButton"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CenterModal;
