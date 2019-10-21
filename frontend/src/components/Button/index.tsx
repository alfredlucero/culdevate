import React from "react";
import "./index.css";

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
}

type ButtonVariant = "primary" | "secondary" | "danger";

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  ...passThroughProps
}) => {
  return (
    <button className="btn btn-primary btn-primary:hover" {...passThroughProps}>
      {children}
    </button>
  );
};

export default Button;
