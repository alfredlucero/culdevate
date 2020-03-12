import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import WorkExperienceEmptyCard from "../EmptyCard";
import WorkExperienceRecap from "../Recap";
import { RecapWorkExperience } from "../../../recaps.interface";

export interface WorkExperienceLayoutProps extends RecapLayoutProps {
  recaps: RecapWorkExperience[];
}

const WorkExperienceLayout: React.FC<WorkExperienceLayoutProps> = ({
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
          <RecapLayout.HeaderTitle>Work Experience</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <WorkExperienceEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="workExperienceEmptyCard"
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
          Work Experience
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap everything about your career from internships to full-time jobs and opportunities.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((workExperience, key) => (
          <WorkExperienceRecap
            workExperience={workExperience}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={() => {
              // TODO: open up this recap's delete modal
            }}
            key={key}
            testId="workExperienceRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>
    </RecapLayout.Container>
  );
};

export default WorkExperienceLayout;
