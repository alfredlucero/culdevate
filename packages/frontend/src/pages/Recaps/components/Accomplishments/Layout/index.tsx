import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import AccomplishmentsEmptyCard from "../EmptyCard";
import AccomplishmentsRecap from "../Recap";
import { RecapAccomplishments } from "../../../recaps.interface";

export interface AccomplishmentsLayoutProps extends RecapLayoutProps {
  recaps: RecapAccomplishments[];
}

const AccomplishmentsLayout: React.FC<AccomplishmentsLayoutProps> = ({
  recaps,
  onGoBackToLanding,
  onCreateRecapSuccess,
  onUpdateRecapSuccess,
  onDeleteRecapSuccess,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  const hasRecaps = recaps.length > 0;

  if (!hasRecaps) {
    return (
      <RecapLayout.Container testId={testId} className={className} {...passThroughProps}>
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
          <RecapLayout.HeaderTitle>Accomplishments</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <AccomplishmentsEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="accomplishmentsEmptyCard"
          />
        </RecapLayout.Content>
      </RecapLayout.Container>
    );
  }

  return (
    <RecapLayout.Container testId={testId} className={className} {...passThroughProps}>
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
        <RecapLayout.HeaderTitle
          onClickAdd={() => {
            // TODO: open up this recap's create modal
          }}
        >
          Accomplishments
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap all the great things you have done or were recognized for.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((accomplishments, key) => (
          <AccomplishmentsRecap
            accomplishments={accomplishments}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={() => {
              // TODO: open up this recap's delete modal
            }}
            key={key}
            testId="accomplishmentsRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>
    </RecapLayout.Container>
  );
};

export default AccomplishmentsLayout;
