import React from "react";
import * as RecapEmptyCard from "../../RecapEmptyCard";
import { RecapEmptyCardProps } from "../../RecapEmptyCard";

const SkillsEmptyCard: React.FC<RecapEmptyCardProps> = ({
  onClickAdd,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapEmptyCard.EmptyCard className={className} testId={testId} {...passThroughProps}>
      <RecapEmptyCard.Icon kind="Skills" className="mb-6 flex justify-center" />
      <RecapEmptyCard.Kind kind="Skills" className="mb-4 text-center" />
      <RecapEmptyCard.Description className="mb-6">
        Recap the things you have learned and their proficiencies.
      </RecapEmptyCard.Description>
      <RecapEmptyCard.Actions onClickAdd={onClickAdd} />
    </RecapEmptyCard.EmptyCard>
  );
};

export default SkillsEmptyCard;
