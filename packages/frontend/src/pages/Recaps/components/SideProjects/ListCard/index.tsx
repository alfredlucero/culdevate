import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";
import { RecapKind } from "../../../recaps.interface";

const SideProjectsListCard: React.FC<RecapListCardProps> = ({
  onClick,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind={RecapKind.SideProjects} className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind={RecapKind.SideProjects} className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default SideProjectsListCard;
