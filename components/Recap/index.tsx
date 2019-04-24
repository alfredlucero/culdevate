import React from "react";

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

const Recap: React.FC<RecapProps> = ({ title, description, type, startDate, endDate }) => {
  return (
    <div>
      {type}
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        {startDate} - {endDate !== null ? endDate : "Present"}
      </p>
    </div>
  );
};

export default Recap;
