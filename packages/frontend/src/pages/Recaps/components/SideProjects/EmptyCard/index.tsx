import React from "react";
import * as RecapEmptyCard from "../../RecapEmptyCard";
import { RecapEmptyCardProps } from "../../RecapEmptyCard";

const SideProjectsEmptyCard: React.FC<RecapEmptyCardProps> = ({
  onClickAdd,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapEmptyCard.EmptyCard className={className} testId={testId} {...passThroughProps}>
      <RecapEmptyCard.Icon kind="Side Projects" className="mb-6 flex justify-center" />
      <RecapEmptyCard.Kind kind="Side Projects" className="mb-4 text-center" />
      <RecapEmptyCard.Description className="mb-6">
        Recap the side hustles and projects you are working and collaborating on.
      </RecapEmptyCard.Description>
      <RecapEmptyCard.Actions onClickAdd={onClickAdd} />
    </RecapEmptyCard.EmptyCard>
  );
};

export default SideProjectsEmptyCard;
