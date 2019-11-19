import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";

interface CardProps extends CommonProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = "", testId = "", ...passThroughProps }) => {
  return (
    <div
      className={cn("bg-white", "shadow-md", "rounded", "px-8", "py-6", className)}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      {children}
    </div>
  );
};

export default Card;
