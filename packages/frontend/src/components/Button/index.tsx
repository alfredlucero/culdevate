import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";

interface ButtonProps extends CommonProps {
  variant: ButtonVariant;
  type: ButtonType;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

type ButtonType = "submit" | "button" | "reset";
type ButtonVariant = "primary" | "secondary" | "danger";

const buttonBaseClasses = ["font-bold", "py-2", "px-4", "rounded"];
const buttonDisabledClasses = ["opacity-50", "cursor-not-allowed"];
const buttonPrimaryClasses = [...buttonBaseClasses, "bg-teal-500", "text-white", "hover:bg-teal-700"];
const buttonSecondaryClasses = [
  "bg-transparent",
  "text-teal-700",
  "border",
  "border-teal-500",
  "hover:bg-teal-500",
  "hover:text-white",
  "hover:border-transparent",
];
const buttonDangerClasses = [...buttonBaseClasses, "bg-red-500", "text-white", "hover:bg-red-700"];

const Button: React.FC<ButtonProps> = ({
  variant,
  type,
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
        buttonBaseClasses,
        ...(variant === "primary" ? buttonPrimaryClasses : []),
        ...(variant === "secondary" ? buttonSecondaryClasses : []),
        ...(variant === "danger" ? buttonDangerClasses : []),
        disabled ? buttonDisabledClasses : [],
      )} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      {children}
    </button>
  );
};

export default Button;
