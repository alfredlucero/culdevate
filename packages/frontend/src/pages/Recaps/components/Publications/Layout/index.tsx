import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import PublicationsEmptyCard from "../EmptyCard";
import PublicationsRecap from "../Recap";
import { RecapPublications } from "../../../recaps.interface";

export interface PublicationsLayoutProps extends RecapLayoutProps {
  recaps: RecapPublications[];
}

const PublicationsLayout: React.FC<PublicationsLayoutProps> = ({
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
          <RecapLayout.HeaderTitle>Publications</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <PublicationsEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="publicationsEmptyCard"
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
          Publications
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the works you published and wrote i.e. blogs, papers, books.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((publications, key) => (
          <PublicationsRecap
            publications={publications}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={() => {
              // TODO: open up this recap's delete modal
            }}
            key={key}
            testId="publicationsRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>
    </RecapLayout.Container>
  );
};

export default PublicationsLayout;
