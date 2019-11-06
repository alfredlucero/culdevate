import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";
import "./index.css";

interface CardProps extends CommonProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = "", testId = "", ...passThroughProps }) => {
  return (
    <div className={cn("card", className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      {children}
    </div>
  );
};

export default Card;
