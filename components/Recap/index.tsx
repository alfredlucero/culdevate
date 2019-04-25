import React from "react";
import Icon, { CuldevateIcon } from "../__common__/Icon";

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

  return mappedIcon ? <Icon icon={mappedIcon} /> : null;
};

const Recap: React.FC<RecapProps> = ({ title, description, type, startDate, endDate }) => {
  return (
    <div>
      {mapRecapTypeToIcon(type)}
      <h2>{title}</h2>
      <p>{description}</p>
      <p data-testid="recapDateRange">
        {startDate} - {endDate !== null ? endDate : "Present"}
      </p>
    </div>
  );
};

export default Recap;
