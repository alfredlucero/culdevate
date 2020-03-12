import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import OrganizationsEmptyCard from "../EmptyCard";
import OrganizationsRecap from "../Recap";
import { RecapOrganizations } from "../../../recaps.interface";

export interface OrganizationsLayoutProps extends RecapLayoutProps {
  recaps: RecapOrganizations[];
}

const OrganizationsLayout: React.FC<OrganizationsLayoutProps> = ({
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
          <RecapLayout.HeaderTitle>Organizations</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <OrganizationsEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="organizationsEmptyCard"
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
          Organizations
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the organizations you were a part of and your impact in those groups.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((organizations, key) => (
          <OrganizationsRecap
            organizations={organizations}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={() => {
              // TODO: open up this recap's delete modal
            }}
            key={key}
            testId="organizationsRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>
    </RecapLayout.Container>
  );
};

export default OrganizationsLayout;
