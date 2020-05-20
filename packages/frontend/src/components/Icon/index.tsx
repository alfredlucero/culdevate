import React from "react";
import cn from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faListAlt,
  faSuitcase,
  faGraduationCap,
  faAward,
  faBook,
  faCertificate,
  faProjectDiagram,
  faUsers,
  faAddressCard,
  faHighlighter,
  faSquare,
  faTimes,
  faTrashAlt,
  faPlus,
  faFan,
  faPencilAlt,
  faExclamationTriangle,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { CommonProps } from "../commonProps";

export interface IconProps extends CommonProps, Omit<FontAwesomeIconProps, "icon" | "size"> {
  variant: IconVariant;
  size: IconSize;
  id?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export type IconVariant =
  | "allRecaps"
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
  | "loadingFan"
  | "editPencil"
  | "exclamationTriangle"
  | "chevronLeft";

export type IconSize = "small" | "medium" | "large" | "xlarge";

const iconVariantToFontAwesomeMap: IconVariantToFontAwesomeMap = {
  allRecaps: faListAlt,
  work: faSuitcase,
  education: faGraduationCap,
  accomplishments: faAward,
  publications: faBook,
  skills: faCertificate,
  projects: faProjectDiagram,
  organizations: faUsers,
  references: faAddressCard,
  other: faHighlighter,
  bulletpoint: faSquare,
  x: faTimes,
  trash: faTrashAlt,
  plus: faPlus,
  loadingFan: faFan,
  editPencil: faPencilAlt,
  exclamationTriangle: faExclamationTriangle,
  chevronLeft: faChevronLeft,
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
