import React from "react";
import * as RecapEmptyCard from "../../RecapEmptyCard";
import { RecapEmptyCardProps } from "../../RecapEmptyCard";
import { RecapKind } from "../../../recaps.interface";

const EducationEmptyCard: React.FC<RecapEmptyCardProps> = ({
  onClickAdd,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapEmptyCard.EmptyCard className={className} testId={testId} {...passThroughProps}>
      <RecapEmptyCard.Icon kind={RecapKind.Education} className="mb-6 flex justify-center" />
      <RecapEmptyCard.Kind kind={RecapKind.Education} className="mb-4 text-center" />
      <RecapEmptyCard.Description className="mb-6">
        Recap the places you have studied and learned the ropes.
      </RecapEmptyCard.Description>
      <RecapEmptyCard.Actions onClickAdd={onClickAdd} />
    </RecapEmptyCard.EmptyCard>
  );
};

export default EducationEmptyCard;
