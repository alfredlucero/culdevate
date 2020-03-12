import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import EducationEmptyCard from "../EmptyCard";
import EducationRecap from "../Recap";
import { RecapEducation } from "../../../recaps.interface";

export interface EducationLayoutProps extends RecapLayoutProps {
  recaps: RecapEducation[];
}

const EducationLayout: React.FC<EducationLayoutProps> = ({
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
        <RecapLayout.Header className="mb-8" onClickBack={() => {}}>
          <RecapLayout.HeaderTitle>Education</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <EducationEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="educationEmptyCard"
          />
        </RecapLayout.Content>
      </RecapLayout.Container>
    );
  }

  return (
    <RecapLayout.Container testId={testId} className={className} {...passThroughProps}>
      <RecapLayout.Header className="mb-8" onClickBack={() => {}}>
        <RecapLayout.HeaderTitle
          onClickAdd={() => {
            // TODO: open up this recap's create modal
          }}
        >
          Education
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the places you have studied and learned the ropes.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((education, key) => (
          <EducationRecap
            education={education}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={() => {
              // TODO: open up this recap's delete modal
            }}
            key={key}
            testId="educationRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>
    </RecapLayout.Container>
  );
};

export default EducationLayout;
