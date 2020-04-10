import React from "react";
import cn from "classnames";
import ReactDOM from "react-dom";
import { CommonProps } from "../commonProps";

export interface FullScreenModalProps extends CommonProps {
  isShowing: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
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
      className={cn("modal", "fixed", "w-full", "h-full", "top-0", "left-0", className)}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <div
        className="modal-overlay absolute w-full h-full bg-gray-100 opacity-75"
        data-testid="fullScreenModalOverlay"
      />
      <div
        className="modal-container fixed w-full h-full z-50 overflow-y-auto"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-content container mx-auto h-auto text-left py-6">
          <div className="modal-header w-full flex justify-end">
            <svg
              className="fill-current text-gray-700 h-10 w-10"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onHide}
              data-testid="fullScreenModalCloseButton"
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

export default FullScreenModal;
