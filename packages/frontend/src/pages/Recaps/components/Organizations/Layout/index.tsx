import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import OrganizationsEmptyCard from "../EmptyCard";
import OrganizationsRecap from "../Recap";
import RecapsConfirmDeleteModal from "../../RecapsConfirmDeleteModal";
import {
  RecapsCreateSuccessAlert,
  RecapsUpdateSuccessAlert,
  RecapsDeleteSuccessAlert,
  RecapsDeleteErrorAlert,
} from "../../RecapsAlerts";
import { Recap, RecapOrganizations, RecapKind } from "../../../recaps.interface";
import { useRecapsAlerts } from "../../../hooks/useRecapsAlerts";
import { useDeleteRecap } from "../../../hooks/useDeleteRecap";

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
  const {
    alertsState,
    showCreateSuccessAlert,
    showUpdateSuccessAlert,
    showDeleteSuccessAlert,
    showDeleteErrorAlert,
    hideAlert,
  } = useRecapsAlerts();

  const {
    isShowingConfirmDeleteModal,
    isProcessingDelete,
    onClickDeleteRecap,
    onClickConfirmDelete,
    onHideConfirmDeleteModal,
  } = useDeleteRecap({
    recaps,
    onDeleteSuccess: (deletedRecap: Recap) => {
      onDeleteRecapSuccess(deletedRecap);
      showDeleteSuccessAlert();
    },
    onDeleteError: () => {
      showDeleteErrorAlert();
    },
  });

  const hasRecaps = recaps.length > 0;

  if (!hasRecaps) {
    return (
      <RecapLayout.Container testId={testId} className={className} {...passThroughProps}>
        <RecapsDeleteSuccessAlert
          isShowing={alertsState.isShowingDeleteSuccessAlert}
          onHide={hideAlert}
          kind={RecapKind.Organizations}
          className="mb-4"
        />
        <RecapsDeleteErrorAlert
          isShowing={alertsState.isShowingDeleteErrorAlert}
          onHide={hideAlert}
          kind={RecapKind.Organizations}
          className="mb-4"
        />
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
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
      <RecapsDeleteSuccessAlert
        isShowing={alertsState.isShowingDeleteSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.Organizations}
        className="mb-4"
      />
      <RecapsDeleteErrorAlert
        isShowing={alertsState.isShowingDeleteErrorAlert}
        onHide={hideAlert}
        kind={RecapKind.Organizations}
        className="mb-4"
      />
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
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
            onDelete={onClickDeleteRecap}
            key={key}
            testId="organizationsRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>

      <RecapsConfirmDeleteModal
        isShowing={isShowingConfirmDeleteModal}
        onHide={onHideConfirmDeleteModal}
        isProcessingDelete={isProcessingDelete}
        onClickConfirmDelete={onClickConfirmDelete}
      />
    </RecapLayout.Container>
  );
};

export default OrganizationsLayout;
