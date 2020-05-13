import React from "react";
import cn from "classnames";
import Icon from "../../../../components/Icon";
import { CommonProps } from "../../../../components/commonProps";
import "./index.css";

export interface RecapIconProps extends CommonProps {
  variant:
    | "allRecaps"
    | "work"
    | "education"
    | "accomplishments"
    | "publications"
    | "skills"
    | "projects"
    | "organizations"
    | "references"
    | "other";
}

const RecapIcon: React.FC<RecapIconProps> = ({ variant, testId = "", className = "", ...passThroughProps }) => {
  return (
    <div
      className={cn(
        "flex",
        "justify-center",
        "items-center",
        "p-3",
        "rounded-lg",
        "bg-gray-200",
        "recap-icon",
        className,
      )}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <Icon size="medium" variant={variant} className="text-teal-400" />
    </div>
  );
};

export default RecapIcon;
