import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";

const SideProjectsListCard: React.FC<RecapListCardProps> = ({
  onClick,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind="Side Projects" className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind="Side Projects" className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default SideProjectsListCard;
