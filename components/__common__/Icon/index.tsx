import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faGraduationCap,
  faAward,
  faBullseye,
  faPenAlt,
  faCheckDouble,
  faUserFriends,
  faTrophy,
  faLevelUpAlt,
} from "@fortawesome/free-solid-svg-icons";

export type CuldevateIcon =
  | "suitcase"
  | "school"
  | "award"
  | "target"
  | "pen"
  | "checkDouble"
  | "userFriends"
  | "trophy"
  | "levelUp";

type IconMap = { [key in CuldevateIcon]: IconDefinition };

const culdevateIconToFontAwesomeIconMap: IconMap = {
  suitcase: faSuitcase, // Used for Work Recap
  school: faGraduationCap, // Used for Education Recap
  award: faAward, // Used for Awards Recap
  target: faBullseye, // Used for Objectives Recap
  pen: faPenAlt, // Used for Proof Recap
  checkDouble: faCheckDouble, // Used for Other Recap
  userFriends: faUserFriends, // Used for Extracurricular Recap
  trophy: faTrophy, // Used for Achievements Recap
  levelUp: faLevelUpAlt, // Used for Skills Recap
};

interface IconProps {
  icon: CuldevateIcon;
}

const Icon: React.FC<IconProps> = ({ icon, ...rest }) => {
  const mappedIcon = culdevateIconToFontAwesomeIconMap[icon];
  return <FontAwesomeIcon icon={mappedIcon} {...rest} />;
};

export default Icon;
