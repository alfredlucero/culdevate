import React from "react";
import styled from "styled-components";
import Icon, { CuldevateIcon, StyledRoundIcon } from "../__common__/Icon";
import { culdevateDefaultTheme } from "../defaultTheme";

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
  description: string;
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

  & figure {
    padding: 30px;
    flex: 0 0 50px;
    margin: 0;
  }
`;

StyledRecap.defaultProps = {
  theme: culdevateDefaultTheme,
};

const StyledRecapSection = styled.section`
  flex: 1 0 auto;
`;

const StyledRecapHeader = styled.header`
  display: flex;
  justify-content: space-between;

  & time {
    font-size: 2rem;
    color: ${props => props.theme.colors.orange};
  }
`;

StyledRecapHeader.defaultProps = {
  theme: culdevateDefaultTheme,
};

const Recap: React.FC<RecapProps> = ({ title, description, type, startDate, endDate }) => {
  return (
    <StyledRecap>
      <figure>{mapRecapTypeToIcon(type)}</figure>
      <StyledRecapSection>
        <StyledRecapHeader>
          <h2>{title}</h2>
          <h3>
            <time data-testid="recapDateRange">
              <em>
                {startDate} - {endDate !== null ? endDate : "Present"}
              </em>
            </time>
          </h3>
        </StyledRecapHeader>
        <p>{description}</p>
        <footer>Edit</footer>
      </StyledRecapSection>
    </StyledRecap>
  );
};

export default Recap;
