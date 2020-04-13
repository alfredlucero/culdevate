import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import ReferencesEmptyCard from "../EmptyCard";
import ReferencesRecap from "../Recap";
import RecapsConfirmDeleteModal from "../../RecapsConfirmDeleteModal";
import {
  RecapsCreateSuccessAlert,
  RecapsUpdateSuccessAlert,
  RecapsDeleteSuccessAlert,
  RecapsDeleteErrorAlert,
} from "../../RecapsAlerts";
import { Recap, RecapReferences, RecapKind } from "../../../recaps.interface";
import { useRecapsAlerts } from "../../../hooks/useRecapsAlerts";
import { useDeleteRecap } from "../../../hooks/useDeleteRecap";

export interface ReferencesLayoutProps extends RecapLayoutProps {
  recaps: RecapReferences[];
}

const ReferencesLayout: React.FC<ReferencesLayoutProps> = ({
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
          kind={RecapKind.References}
          className="mb-4"
        />
        <RecapsDeleteErrorAlert
          isShowing={alertsState.isShowingDeleteErrorAlert}
          onHide={hideAlert}
          kind={RecapKind.References}
          className="mb-4"
        />
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
          <RecapLayout.HeaderTitle>References</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <ReferencesEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="referencesEmptyCard"
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
        kind={RecapKind.References}
        className="mb-4"
      />
      <RecapsDeleteErrorAlert
        isShowing={alertsState.isShowingDeleteErrorAlert}
        onHide={hideAlert}
        kind={RecapKind.References}
        className="mb-4"
      />
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
        <RecapLayout.HeaderTitle
          onClickAdd={() => {
            // TODO: open up this recap's create modal
          }}
        >
          References
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the people you have worked with and who can vouch for you in your next move.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((references, key) => (
          <ReferencesRecap
            references={references}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={onClickDeleteRecap}
            key={key}
            testId="referencesRecap"
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

export default ReferencesLayout;
