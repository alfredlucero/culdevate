import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";

export interface AlertProps extends CommonProps {
  isShowing: boolean;
  variant: AlertVariant;
  onHide: () => void;
  children: React.ReactNode;
}

type AlertVariant = "success" | "info" | "warning" | "danger";

const alertBaseClasses = [
  "border-l-4",
  "p-4",
  "cursor-pointer",
  "rounded",
  "shadow",
  "flex",
  "justify-between",
  "break-words",
];
const alertSuccessTextClass = "text-green-700";
const alertSuccessClasses = [alertSuccessTextClass, "bg-green-100", "border-green-500"];
const alertInfoTextClass = "text-blue-700";
const alertInfoClasses = [alertInfoTextClass, "bg-blue-100", "border-blue-500"];
const alertWarningTextClass = "text-orange-700";
const alertWarningClasses = [alertWarningTextClass, "bg-orange-100", "border-orange-500"];
const alertDangerTextClass = "text-red-700";
const alertDangerClasses = [alertDangerTextClass, "bg-red-100", "border-red-500"];

const Alert: React.FC<AlertProps> = ({
  isShowing,
  variant,
  onHide,
  children,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  if (!isShowing) {
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
      onClick={onHide}
      role="alert"
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <div className="w-5/6">{children}</div>
      <div className="w-1/6 flex justify-end items-center">
        <svg
          className={cn("fill-current", "h-6", "w-6", {
            [alertSuccessTextClass]: variant === "success",
            [alertInfoTextClass]: variant === "info",
            [alertWarningTextClass]: variant === "warning",
            [alertDangerTextClass]: variant === "danger",
          })}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </div>
    </div>
  );
};

export default Alert;
