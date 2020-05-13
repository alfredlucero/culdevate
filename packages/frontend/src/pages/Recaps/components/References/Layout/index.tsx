import React, { useState } from "react";
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
import ReferencesForm from "../Form";
import RecapsCreateModal from "../../RecapsCreateModal";
import RecapsEditModal from "../../RecapsEditModal";
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

  const [isShowingCreateModal, setIsShowingCreateModal] = useState(false);
  const onShowCreateModal = () => {
    setIsShowingCreateModal(true);
  };
  const onHideCreateModal = () => {
    setIsShowingCreateModal(false);
  };
  const onSaveSuccessCreate = (createdRecap: RecapReferences) => {
    onCreateRecapSuccess(createdRecap);
    showCreateSuccessAlert();
  };

  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const [selectedEditRecap, setSelectedEditRecap] = useState<RecapReferences | null>(null);
  const onClickEditRecap = (e: React.MouseEvent) => {
    const recapId = e.currentTarget.id;

    const newSelectedEditRecap = recaps.find(recap => recap._id === recapId);

    if (!newSelectedEditRecap) {
      return;
    }

    setSelectedEditRecap(newSelectedEditRecap);
    setIsShowingEditModal(true);
  };
  const onHideEditModal = () => {
    setIsShowingEditModal(false);
  };
  const onSaveSuccessEdit = (updatedRecap: RecapReferences) => {
    onUpdateRecapSuccess(updatedRecap);
    showUpdateSuccessAlert();
  };

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
          <ReferencesEmptyCard onClickAdd={onShowCreateModal} testId="referencesEmptyCard" />
        </RecapLayout.Content>

        <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={RecapKind.References}>
          <ReferencesForm
            initialRecap={null}
            isShowing={isShowingCreateModal}
            onHide={onHideCreateModal}
            onSaveSuccess={onSaveSuccessCreate}
          />
        </RecapsCreateModal>
      </RecapLayout.Container>
    );
  }

  return (
    <RecapLayout.Container testId={testId} className={className} {...passThroughProps}>
      <RecapsCreateSuccessAlert
        isShowing={alertsState.isShowingCreateSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.References}
        className="mb-4"
      />
      <RecapsUpdateSuccessAlert
        isShowing={alertsState.isShowingUpdateSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.References}
        className="mb-4"
      />
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
        <RecapLayout.HeaderTitle onClickAdd={onShowCreateModal}>References</RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the people you have worked with and who can vouch for you in your next move.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((references, key) => (
          <ReferencesRecap
            references={references}
            onEdit={onClickEditRecap}
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

      <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={RecapKind.References}>
        <ReferencesForm
          initialRecap={null}
          isShowing={isShowingCreateModal}
          onHide={onHideCreateModal}
          onSaveSuccess={onSaveSuccessCreate}
        />
      </RecapsCreateModal>

      <RecapsEditModal isShowing={isShowingEditModal} onHide={onHideEditModal} kind={RecapKind.References}>
        <ReferencesForm
          initialRecap={selectedEditRecap}
          isShowing={isShowingEditModal}
          onHide={onHideEditModal}
          onSaveSuccess={onSaveSuccessEdit}
        />
      </RecapsEditModal>
    </RecapLayout.Container>
  );
};

export default ReferencesLayout;
