import React from "react";
import styled from "styled-components";
import { culdevateDefaultTheme } from "../../defaultTheme";

interface StyledButtonProps {
  onClick: (event: React.MouseEvent) => void;
  disabled: boolean;
  kind: ButtonKind;
  type: ButtonType;
  size: ButtonSize;
}
const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 5px;
`;
StyledButton.defaultProps = {
  theme: culdevateDefaultTheme,
};

export type ButtonKind = "primary" | "danger" | "secondary-primary" | "secondary-danger";
export type ButtonType = "button" | "submit" | "reset";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  onClick: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  kind: ButtonKind;
  type: ButtonType;
  size: ButtonSize;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  kind,
  type,
  size,
  disabled = false,
  ...passThroughProps
}) => {
  return (
    <StyledButton onClick={onClick} kind={kind} type={type} size={size} disabled={disabled} {...passThroughProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
