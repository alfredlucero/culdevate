import React from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import OtherEmptyCard from "../EmptyCard";
import OtherRecap from "../Recap";
import RecapsConfirmDeleteModal from "../../RecapsConfirmDeleteModal";
import {
  RecapsCreateSuccessAlert,
  RecapsUpdateSuccessAlert,
  RecapsDeleteSuccessAlert,
  RecapsDeleteErrorAlert,
} from "../../RecapsAlerts";
import { Recap, RecapOther, RecapKind } from "../../../recaps.interface";
import { useRecapsAlerts } from "../../../hooks/useRecapsAlerts";
import { useDeleteRecap } from "../../../hooks/useDeleteRecap";

export interface OtherLayoutProps extends RecapLayoutProps {
  recaps: RecapOther[];
}

const OtherLayout: React.FC<OtherLayoutProps> = ({
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
          kind={RecapKind.Other}
          className="mb-4"
        />
        <RecapsDeleteErrorAlert
          isShowing={alertsState.isShowingDeleteErrorAlert}
          onHide={hideAlert}
          kind={RecapKind.Other}
          className="mb-4"
        />
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
          <RecapLayout.HeaderTitle>Other</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <OtherEmptyCard
            onClickAdd={() => {
              // TODO: open up create modal
            }}
            testId="otherEmptyCard"
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
        kind={RecapKind.Other}
        className="mb-4"
      />
      <RecapsDeleteErrorAlert
        isShowing={alertsState.isShowingDeleteErrorAlert}
        onHide={hideAlert}
        kind={RecapKind.Other}
        className="mb-4"
      />
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
        <RecapLayout.HeaderTitle
          onClickAdd={() => {
            // TODO: open up this recap's create modal
          }}
        >
          Other
        </RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the other things and everything else worth remembering.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((other, key) => (
          <OtherRecap
            other={other}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={onClickDeleteRecap}
            key={key}
            testId="otherRecap"
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

export default OtherLayout;
