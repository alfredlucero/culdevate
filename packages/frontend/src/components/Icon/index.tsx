import React from "react";
import cn from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faSuitcase,
  faGraduationCap,
  faAward,
  faBook,
  faCertificate,
  faProjectDiagram,
  faUsers,
  faAddressCard,
  faHighlighter,
  faChevronCircleRight,
  faTimes,
  faTrashAlt,
  faPlus,
  faFan,
} from "@fortawesome/free-solid-svg-icons";
import { CommonProps } from "../commonProps";

export interface IconProps extends CommonProps, Omit<FontAwesomeIconProps, "icon" | "size"> {
  variant: IconVariant;
  size: IconSize;
  id?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export type IconVariant =
  | "work"
  | "education"
  | "accomplishments"
  | "publications"
  | "skills"
  | "projects"
  | "organizations"
  | "references"
  | "other"
  | "bulletpoint"
  | "x"
  | "trash"
  | "plus"
  | "loadingFan";

export type IconSize = "small" | "medium" | "large" | "xlarge";

const iconVariantToFontAwesomeMap: IconVariantToFontAwesomeMap = {
  work: faSuitcase,
  education: faGraduationCap,
  accomplishments: faAward,
  publications: faBook,
  skills: faCertificate,
  projects: faProjectDiagram,
  organizations: faUsers,
  references: faAddressCard,
  other: faHighlighter,
  bulletpoint: faChevronCircleRight,
  x: faTimes,
  trash: faTrashAlt,
  plus: faPlus,
  loadingFan: faFan,
};

type IconVariantToFontAwesomeMap = {
  [iconVariant in IconVariant]: IconDefinition;
};

const Icon: React.FC<IconProps> = ({
  variant,
  size,
  onClick = () => {},
  id = "",
  testId = "",
  className = "",
  ...restOfIconProps
}) => {
  const icon = iconVariantToFontAwesomeMap[variant];

  return (
    <div
      onClick={onClick}
      className={cn(
        "font-sans",
        "text-gray-800",
        {
          "text-2xl": size === "small",
          "text-3xl": size === "medium",
          "text-4xl": size === "large",
          "text-6xl": size === "xlarge",
        },
        className,
      )}
      id={id}
      {...(testId !== "" ? { "data-testid": testId } : {})}
    >
      <FontAwesomeIcon icon={icon} {...restOfIconProps} />
    </div>
  );
};

export default Icon;
