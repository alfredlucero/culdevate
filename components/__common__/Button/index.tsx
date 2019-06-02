import React from "react";
import styled, { css } from "../../../@types/styled-components/index";
import { culdevateThemes } from "../../defaultTheme";

interface StyledButtonProps {
  onClick: (event: React.MouseEvent) => void;
  disabled: boolean;
  kind: ButtonKind;
  type: ButtonType;
  size: ButtonSize;
}
const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;

  ${({ size }) =>
    size === "small" &&
    css`
      padding: 1rem;
      font-size: 1rem;
    `}

  ${({ size }) =>
    size === "medium" &&
    css`
      padding: 1.5rem;
      font-size: 1.5rem;
    `}

  ${({ size }) =>
    size === "large" &&
    css`
      padding: 2rem;
      font-size: 2rem;
    `} 

  ${({
    kind,
    disabled,
    theme: {
      semanticColors: { btnDisabledBgColor, btnPrimaryBgColor, btnPrimaryBgHoverColor, btnPrimaryColor },
    },
  }) =>
    kind === "primary" &&
    css`
      background-color: ${disabled ? btnDisabledBgColor : btnPrimaryBgColor};
      color: ${btnPrimaryColor};

      &:hover {
        background-color: ${disabled ? btnDisabledBgColor : btnPrimaryBgHoverColor};
      }
    `}

  ${({
    kind,
    disabled,
    theme: {
      semanticColors: { btnDangerBgColor, btnDangerColor, btnDisabledBgColor, btnDangerBgHoverColor },
    },
  }) =>
    kind === "danger" &&
    css`
      background-color: ${disabled ? btnDisabledBgColor : btnDangerBgColor};
      color: ${btnDangerColor};

      &:hover {
        background-color: ${disabled ? btnDisabledBgColor : btnDangerBgHoverColor};
      }
    `}

  ${({
    kind,
    disabled,
    theme: {
      semanticColors: {
        btnSecondaryBgColor,
        btnSecondaryBgHoverColor,
        btnSecondaryColor,
        btnSecondaryBorderColor,
        btnSecondaryDisabledColor,
        btnSecondaryDisabledBgColor,
        btnSecondaryBorderDisabledColor,
      },
    },
  }) =>
    kind === "secondary" &&
    css`
      border: ${disabled ? btnSecondaryBorderDisabledColor : btnSecondaryBorderColor} 0.2rem solid;
      background-color: ${btnSecondaryBgColor};
      color: ${disabled ? btnSecondaryDisabledColor : btnSecondaryColor};

      &:hover {
        background-color: ${disabled ? btnSecondaryDisabledBgColor : btnSecondaryBgHoverColor};
      }
    `}

    ${({
      kind,
      disabled,
      theme: {
        semanticColors: {
          btnSecondaryDangerBgColor,
          btnSecondaryDangerColor,
          btnSecondaryDangerBorderColor,
          btnSecondaryDisabledColor,
          btnSecondaryDisabledBgColor,
          btnSecondaryDangerBgHoverColor,
          btnSecondaryBorderDisabledColor,
        },
      },
    }) =>
      kind === "secondaryDanger" &&
      css`
        border: ${disabled ? btnSecondaryBorderDisabledColor : btnSecondaryDangerBorderColor} 0.2rem solid;
        background-color: ${btnSecondaryDangerBgColor};
        color: ${disabled ? btnSecondaryDisabledColor : btnSecondaryDangerColor};

        &:hover {
          background-color: ${disabled ? btnSecondaryDisabledBgColor : btnSecondaryDangerBgHoverColor};
        }
      `}
`;
StyledButton.defaultProps = {
  theme: culdevateThemes.light,
};

export type ButtonKind = "primary" | "danger" | "secondary" | "secondaryDanger";
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
