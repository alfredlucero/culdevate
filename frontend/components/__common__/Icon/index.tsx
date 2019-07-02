import React from "react";
import styled, { css } from "../../../@types/styled-components/index";
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
import { culdevateThemes } from "../../defaultTheme";

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

export const StyledRoundIcon = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  ${({ theme }) => css`
    background-color: ${theme.semanticColors.iconBgColor};
    color: ${theme.semanticColors.iconColor};
  `}
`;

StyledRoundIcon.defaultProps = {
  theme: culdevateThemes.light,
};

export default Icon;
