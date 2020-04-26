import React from "react";
import * as RecapEmptyCard from "../../RecapEmptyCard";
import { RecapEmptyCardProps } from "../../RecapEmptyCard";
import { RecapKind } from "../../../recaps.interface";

const WorkExperienceEmptyCard: React.FC<RecapEmptyCardProps> = ({
  onClickAdd,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapEmptyCard.EmptyCard className={className} testId={testId} {...passThroughProps}>
      <RecapEmptyCard.Icon kind={RecapKind.WorkExperience} className="mb-6 flex justify-center" />
      <RecapEmptyCard.Kind kind={RecapKind.WorkExperience} className="mb-4 text-center" />
      <RecapEmptyCard.Description className="mb-6">
        Recap everything about your career from internships to full-time jobs and opportunities.
      </RecapEmptyCard.Description>
      <RecapEmptyCard.Actions onClickAdd={onClickAdd} />
    </RecapEmptyCard.EmptyCard>
  );
};

export default WorkExperienceEmptyCard;
