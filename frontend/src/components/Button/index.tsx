import React from "react";
import "./index.css";

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

type ButtonVariant = "primary" | "secondary" | "danger";

const Button: React.FC<ButtonProps> = ({ variant, children, onClick, ...passThroughProps }) => {
  return (
    <button className="btn btn-primary btn-primary:hover" {...passThroughProps} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
