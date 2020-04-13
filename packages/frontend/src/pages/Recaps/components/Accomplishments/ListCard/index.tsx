import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";
import { RecapKind } from "../../../recaps.interface";

const AccomplishmentsListCard: React.FC<RecapListCardProps> = ({
  onClick,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind={RecapKind.Accomplishments} className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind={RecapKind.Accomplishments} className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default AccomplishmentsListCard;
