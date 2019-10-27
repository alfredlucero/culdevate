import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";
import "./index.css";

interface TextProps extends CommonProps {
  variant: TextVariant;
  children: React.ReactNode;
  small?: boolean;
  italic?: boolean;
  bold?: boolean;
}

type TextVariant = "p" | "span";

const Text: React.FC<TextProps> = ({
  variant,
  children,
  small = false,
  italic = false,
  bold = false,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  if (variant === "span") {
    return (
      <span
        className={`${cn("text", "text-normal", {
          "text-small": small,
          "text-italic": italic,
          "text-bold": bold,
        })} ${className}`}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        {children}
      </span>
    );
  }

  if (variant === "p") {
    return (
      <p
        className={`${cn("text", "text-normal", {
          "text-small": small,
          "text-italic": italic,
          "text-bold": bold,
        })} ${className}`}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        {children}
      </p>
    );
  }

  return null;
};

export default Text;
