import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";

const OrganizationsListCard: React.FC<RecapListCardProps> = ({
  onClick,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind="Organizations" className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind="Organizations" className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default OrganizationsListCard;
