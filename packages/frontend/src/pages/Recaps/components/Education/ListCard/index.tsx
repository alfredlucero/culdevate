import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";

const EducationListCard: React.FC<RecapListCardProps> = ({
  onClick,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind="Education" className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind="Education" className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default EducationListCard;
