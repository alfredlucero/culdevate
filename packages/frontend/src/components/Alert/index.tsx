import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";

interface AlertProps extends CommonProps {
  isVisible: boolean;
  variant: AlertVariant;
  onClose: () => void;
  children: React.ReactNode;
}

type AlertVariant = "success" | "info" | "warning" | "danger";

const alertBaseClasses = ["border-l-4", "p-4", "cursor-pointer", "rounded", "shadow"];
const alertSuccessClasses = ["bg-green-100", "border-green-500", "text-green-700"];
const alertInfoClasses = ["bg-blue-100", "border-blue-500", "text-blue-700"];
const alertWarningClasses = ["bg-orange-100", "border-orange-500", "text-orange-700"];
const alertDangerClasses = ["bg-red-100", "border-red-500", "text-red-700"];

const Alert: React.FC<AlertProps> = ({
  isVisible,
  variant,
  onClose,
  children,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${cn(
        alertBaseClasses,
        ...(variant === "success" ? alertSuccessClasses : []),
        ...(variant === "info" ? alertInfoClasses : []),
        ...(variant === "warning" ? alertWarningClasses : []),
        ...(variant === "danger" ? alertDangerClasses : []),
      )} ${className}`}
      onClick={onClose}
      role="alert"
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      {children}
    </div>
  );
};

export default Alert;
