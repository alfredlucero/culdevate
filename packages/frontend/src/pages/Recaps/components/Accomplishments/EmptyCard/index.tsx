import React from "react";
import * as RecapEmptyCard from "../../RecapEmptyCard";
import { RecapEmptyCardProps } from "../../RecapEmptyCard";
import { RecapKind } from "../../../recaps.interface";

const AccomplishmentsEmptyCard: React.FC<RecapEmptyCardProps> = ({
  onClickAdd,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapEmptyCard.EmptyCard className={className} testId={testId} {...passThroughProps}>
      <RecapEmptyCard.Icon kind={RecapKind.Accomplishments} className="mb-6 flex justify-center" />
      <RecapEmptyCard.Kind kind={RecapKind.Accomplishments} className="mb-4 text-center" />
      <RecapEmptyCard.Description className="mb-6">
        Recap all the great things you have done or were recognized for.
      </RecapEmptyCard.Description>
      <RecapEmptyCard.Actions onClickAdd={onClickAdd} />
    </RecapEmptyCard.EmptyCard>
  );
};

export default AccomplishmentsEmptyCard;
