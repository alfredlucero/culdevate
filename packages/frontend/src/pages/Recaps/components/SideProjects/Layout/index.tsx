import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import SideProjectsEmptyCard from "../EmptyCard";
import SideProjectsRecap from "../Recap";
import { RecapSideProjects } from "../../../recaps.interface";

export interface SideProjectsLayoutProps extends RecapLayoutProps {
  recaps: RecapSideProjects[];
}

const SideProjectsLayout: React.FC<SideProjectsLayoutProps> = ({
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
          <RecapLayout.HeaderTitle>Side Projects</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <SideProjectsEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="sideProjectsEmptyCard"
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
          Side Projects
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the side hustles and projects you are working and collaborating on.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((sideProjects, key) => (
          <SideProjectsRecap
            sideProjects={sideProjects}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={() => {
              // TODO: open up this recap's delete modal
            }}
            key={key}
            testId="sideProjectsRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>
    </RecapLayout.Container>
  );
};

export default SideProjectsLayout;
