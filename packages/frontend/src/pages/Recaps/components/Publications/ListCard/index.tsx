import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";
import { RecapKind } from "../../../recaps.interface";

const PublicationsListCard: React.FC<RecapListCardProps> = ({
  onClick,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind={RecapKind.Publications} className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind={RecapKind.Publications} className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default PublicationsListCard;
