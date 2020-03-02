import React from "react";
import * as RecapEmptyCard from "../../RecapEmptyCard";
import { RecapEmptyCardProps } from "../../RecapEmptyCard";

const PublicationsEmptyCard: React.FC<RecapEmptyCardProps> = ({
  onClickAdd,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapEmptyCard.EmptyCard className={className} testId={testId} {...passThroughProps}>
      <RecapEmptyCard.Icon kind="Publications" className="mb-6 flex justify-center" />
      <RecapEmptyCard.Kind kind="Publications" className="mb-4 text-center" />
      <RecapEmptyCard.Description className="mb-6">
        Recap the works you published and wrote i.e. blogs, papers, books.
      </RecapEmptyCard.Description>
      <RecapEmptyCard.Actions onClickAdd={onClickAdd} />
    </RecapEmptyCard.EmptyCard>
  );
};

export default PublicationsEmptyCard;
