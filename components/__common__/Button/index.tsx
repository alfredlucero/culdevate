import React from "react";
import styled, { css } from "styled-components";
import { culdevateDefaultTheme } from "../../defaultTheme";

interface StyledButtonProps {
  onClick: (event: React.MouseEvent) => void;
  disabled: boolean;
  kind: ButtonKind;
  type: ButtonType;
  size: ButtonSize;
}
const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  border-radius: 2px;
  cursor: pointer;

  ${props =>
    props.size === "small" &&
    css`
      padding: 1rem;
      font-size: 1rem;
    `};

  ${props =>
    props.size === "medium" &&
    css`
      padding: 1.5rem;
      font-size: 1.5rem;
    `};

  ${props =>
    props.size === "large" &&
    css`
      padding: 2rem;
      font-size: 2rem;
    `};

  ${props =>
    props.kind === "primary" &&
    css`
      background-color: ${props.disabled ? props.theme.colors.gray : props.theme.colors.blue};
      color: ${props.theme.colors.white};
    `}
  
  ${props =>
    props.kind === "secondary-primary" &&
    css`
      border: ${props.disabled ? props.theme.colors.gray : props.theme.colors.blue} 2px solid;
      background-color: ${props.theme.colors.white};
      color: ${props.disabled ? props.theme.colors.gray : props.theme.colors.blue};
    `}

  ${props =>
    props.kind === "danger" &&
    css`
      background-color: ${props.disabled ? props.theme.colors.gray : props.theme.colors.red};
      color: ${props.theme.colors.white};
    `}

  ${props =>
    props.kind === "secondary-danger" &&
    css`
      border: ${props.disabled ? props.theme.colors.gray : props.theme.colors.red} 2px solid;
      background-color: ${props.theme.colors.white};
      color: ${props.disabled ? props.theme.colors.gray : props.theme.colors.red};
    `}
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
