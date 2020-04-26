import React from "react";
import * as RecapEmptyCard from "../../RecapEmptyCard";
import { RecapEmptyCardProps } from "../../RecapEmptyCard";
import { RecapKind } from "../../../recaps.interface";

const ReferencesEmptyCard: React.FC<RecapEmptyCardProps> = ({
  onClickAdd,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapEmptyCard.EmptyCard className={className} testId={testId} {...passThroughProps}>
      <RecapEmptyCard.Icon kind={RecapKind.References} className="mb-6 flex justify-center" />
      <RecapEmptyCard.Kind kind={RecapKind.References} className="mb-4 text-center" />
      <RecapEmptyCard.Description className="mb-6">
        Recap the people you have worked with and who can vouch for you in your next move.
      </RecapEmptyCard.Description>
      <RecapEmptyCard.Actions onClickAdd={onClickAdd} />
    </RecapEmptyCard.EmptyCard>
  );
};

export default ReferencesEmptyCard;
