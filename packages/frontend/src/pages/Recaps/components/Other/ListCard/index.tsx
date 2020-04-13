import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";
import { RecapKind } from "../../../recaps.interface";

const OtherListCard: React.FC<RecapListCardProps> = ({ onClick, className = "", testId = "", ...passThroughProps }) => {
  return (
    <RecapListCard.ListCard onClick={onClick} className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind={RecapKind.Other} className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind={RecapKind.Other} className="text-center" />
    </RecapListCard.ListCard>
  );
};

export default OtherListCard;
