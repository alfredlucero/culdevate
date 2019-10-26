import React from "react";
import "./index.css";

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

type ButtonVariant = "primary" | "secondary" | "danger";

const Button: React.FC<ButtonProps> = ({ variant, children, onClick, disabled = false, ...passThroughProps }) => {
  return (
    <button className="btn btn-primary btn-primary:hover" {...passThroughProps} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
