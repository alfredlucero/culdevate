import React from "react";
import * as RecapListCard from "../../RecapListCard";
import { RecapListCardProps } from "../../RecapListCard";

const EducationListCard: React.FC<RecapListCardProps> = ({
  onClickAdd,
  onClickView,
  count,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <RecapListCard.ListCard className={className} testId={testId} {...passThroughProps}>
      <RecapListCard.Icon kind="Education" className="mb-6 flex justify-center" />
      <RecapListCard.Kind kind="Education" className="mb-4 text-center" />
      <RecapListCard.Actions onClickAdd={onClickAdd} onClickView={onClickView} className="mb-4" />
      <div className="flex justify-end">
        <RecapListCard.Count count={count} />
      </div>
    </RecapListCard.ListCard>
  );
};

export default EducationListCard;
