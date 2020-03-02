import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";

const SkillsListCard: React.FC<RecapListCardProps> = ({
  onClick,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind="Skills" className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind="Skills" className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default SkillsListCard;
