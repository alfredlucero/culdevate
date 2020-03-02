import React from "react";
import * as RecapEmptyCard from "../../RecapEmptyCard";
import { RecapEmptyCardProps } from "../../RecapEmptyCard";

const OrganizationsEmptyCard: React.FC<RecapEmptyCardProps> = ({
  onClickAdd,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapEmptyCard.EmptyCard className={className} testId={testId} {...passThroughProps}>
      <RecapEmptyCard.Icon kind="Organizations" className="mb-6 flex justify-center" />
      <RecapEmptyCard.Kind kind="Organizations" className="mb-4 text-center" />
      <RecapEmptyCard.Description className="mb-6">
        Recap the organizations you were a part of and your impact in those groups.
      </RecapEmptyCard.Description>
      <RecapEmptyCard.Actions onClickAdd={onClickAdd} />
    </RecapEmptyCard.EmptyCard>
  );
};

export default OrganizationsEmptyCard;
