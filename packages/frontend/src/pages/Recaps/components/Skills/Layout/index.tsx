import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import SkillsEmptyCard from "../EmptyCard";
import SkillsRecap from "../Recap";
import { RecapSkills } from "../../../recaps.interface";

export interface SkillsLayoutProps extends RecapLayoutProps {
  recaps: RecapSkills[];
}

const SkillsLayout: React.FC<SkillsLayoutProps> = ({
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
          <RecapLayout.HeaderTitle>Skills</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <SkillsEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="skillsEmptyCard"
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
          Skills
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the things you have learned and their proficiencies.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((skills, key) => (
          <SkillsRecap
            skills={skills}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={() => {
              // TODO: open up this recap's delete modal
            }}
            key={key}
            testId="skillsRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>
    </RecapLayout.Container>
  );
};

export default SkillsLayout;
