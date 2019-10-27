import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";
import "./index.css";

interface ButtonProps extends CommonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

type ButtonVariant = "primary" | "secondary" | "danger";

const buttonPrimaryClasses = ["btn-primary", "btn-primary:hover"];
const buttonSecondaryClasses = ["btn-secondary", "btn-secondary:hover"];
// TODO: implement these danger classes
const buttonDangerClasses = ["btn-danger", "btn-danger:hover"];

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  disabled = false,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <button
      className={`${cn(
        "btn",
        ...(variant === "primary" ? buttonPrimaryClasses : []),
        ...(variant === "secondary" ? buttonSecondaryClasses : []),
        ...(variant === "danger" ? buttonDangerClasses : []),
        {
          "btn-disabled": disabled,
        },
      )} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      {children}
    </button>
  );
};

export default Button;
