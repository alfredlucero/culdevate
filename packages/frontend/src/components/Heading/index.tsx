import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";
import "./index.css";

interface HeadingProps extends CommonProps {
  variant: HeadingVariant;
  children: React.ReactNode;
  italic?: boolean;
}

type HeadingVariant = "h1" | "h2" | "h3" | "h4";

const Heading: React.FC<HeadingProps> = ({
  variant,
  children,
  italic = false,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  if (variant === "h1") {
    return (
      <h1
        className={`${cn("heading", "heading-1", {
          "heading-italic": italic,
        })} ${className}`}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        {children}
      </h1>
    );
  }

  if (variant === "h2") {
    return (
      <h2
        className={`${cn("heading", "heading-2", {
          "heading-italic": italic,
        })} ${className}`}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        {children}
      </h2>
    );
  }

  if (variant === "h3") {
    return (
      <h3
        className={`${cn("heading", "heading-3", {
          "heading-italic": italic,
        })} ${className}`}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        {children}
      </h3>
    );
  }

  if (variant === "h4") {
    return (
      <h4
        className={`${cn("heading", "heading-4", {
          "heading-italic": italic,
        })} ${className}`}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        {children}
      </h4>
    );
  }

  return null;
};

export default Heading;
