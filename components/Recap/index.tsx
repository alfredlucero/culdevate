import React from "react";
import styled from "styled-components";
import "../../moduleTypes/styled-components.d.ts";
import Icon, { CuldevateIcon, StyledRoundIcon } from "../__common__/Icon";
import { H3, P } from "../__common__/Text";
import { culdevateThemes } from "../defaultTheme";

export type RecapType =
  | "objectives"
  | "work"
  | "education"
  | "extracurricular"
  | "skills"
  | "achievements"
  | "awards"
  | "proof"
  | "other";

export interface RecapProps {
  title: string;
  subtitle: string;
  bulletPoints: string[];
  type: RecapType;
  startDate: string;
  endDate: string | null;
}

const mapRecapTypeToIcon = (recapType: RecapType): React.ReactNode | null => {
  const recapTypeToIconMap: { [key in RecapType]: CuldevateIcon } = {
    objectives: "target",
    work: "suitcase",
    education: "school",
    extracurricular: "userFriends",
    skills: "levelUp",
    achievements: "trophy",
    awards: "award",
    proof: "pen",
    other: "checkDouble",
  };
  const mappedIcon = recapTypeToIconMap[recapType];

  return mappedIcon ? (
    <StyledRoundIcon>
      <Icon icon={mappedIcon} />
    </StyledRoundIcon>
  ) : null;
};

const StyledRecap = styled.article`
  display: flex;
  min-width: 760px;
`;

const StyledRecapSection = styled.section`
  flex: 1 0 auto;
  padding: 2.5rem 2.5rem 2.5rem 0;

  ul {
    color: ${props => props.theme.semanticColors.normalTextColor};
  }
`;
StyledRecapSection.defaultProps = {
  theme: culdevateThemes.light,
};

const StyledRecapFigure = styled.figure`
  display: flex;
  padding: 3rem;
  margin: 0;
  flex: 0 0 8rem;
  flex-direction: column;
  align-items: center;
`;

const StyledRecapHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h3 {
    flex: 3 0 0;
  }

  & h4 {
    flex: 1 0 10rem;
    text-align: right;
  }
`;

const Recap: React.FC<RecapProps> = ({ title, subtitle, bulletPoints, type, startDate, endDate }) => {
  const hasBulletPoints = bulletPoints.length > 0;
  return (
    <StyledRecap>
      <StyledRecapFigure>{mapRecapTypeToIcon(type)}</StyledRecapFigure>
      <StyledRecapSection>
        <StyledRecapHeader>
          <H3>{title}</H3>
          <P>
            <time data-testid="recapDateRange">
              <em>
                {startDate} - {endDate !== null ? endDate : "Present"}
              </em>
            </time>
          </P>
        </StyledRecapHeader>
        <P>
          <strong>{subtitle}</strong>
        </P>
        {hasBulletPoints && (
          <ul>
            {bulletPoints.map((bulletPoint, idx) => (
              <li key={idx} data-testid="bulletPoint">
                <P>{bulletPoint}</P>
              </li>
            ))}
          </ul>
        )}
        <P># {type}</P>
      </StyledRecapSection>
    </StyledRecap>
  );
};

export default Recap;
