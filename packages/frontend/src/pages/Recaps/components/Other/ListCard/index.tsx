import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";

const OtherListCard: React.FC<RecapListCardProps> = ({ onClick, className = "", testId = "", ...passThroughProps }) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind="Other" className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind="Other" className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default OtherListCard;
