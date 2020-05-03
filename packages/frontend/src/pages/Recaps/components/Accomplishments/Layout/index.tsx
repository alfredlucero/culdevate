import React, { useState } from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import AccomplishmentsEmptyCard from "../EmptyCard";
import AccomplishmentsRecap from "../Recap";
import RecapsConfirmDeleteModal from "../../RecapsConfirmDeleteModal";
import {
  RecapsCreateSuccessAlert,
  RecapsUpdateSuccessAlert,
  RecapsDeleteSuccessAlert,
  RecapsDeleteErrorAlert,
} from "../../RecapsAlerts";
import AccomplishmentsForm from "../Form";
import RecapsCreateModal from "../../RecapsCreateModal";
import RecapsEditModal from "../../RecapsEditModal";
import { Recap, RecapAccomplishments, RecapKind } from "../../../recaps.interface";
import { useRecapsAlerts } from "../../../hooks/useRecapsAlerts";
import { useDeleteRecap } from "../../../hooks/useDeleteRecap";

export interface AccomplishmentsLayoutProps extends RecapLayoutProps {
  recaps: RecapAccomplishments[];
}

const AccomplishmentsLayout: React.FC<AccomplishmentsLayoutProps> = ({
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
  const onSaveSuccessCreate = (createdRecap: RecapAccomplishments) => {
    onCreateRecapSuccess(createdRecap);
    showCreateSuccessAlert();
  };

  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const [selectedEditRecap, setSelectedEditRecap] = useState<RecapAccomplishments | null>(null);
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
  const onSaveSuccessEdit = (updatedRecap: RecapAccomplishments) => {
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
          kind={RecapKind.Accomplishments}
          className="mb-4"
        />
        <RecapsDeleteErrorAlert
          isShowing={alertsState.isShowingDeleteErrorAlert}
          onHide={hideAlert}
          kind={RecapKind.Accomplishments}
          className="mb-4"
        />
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
          <RecapLayout.HeaderTitle>Accomplishments</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <AccomplishmentsEmptyCard onClickAdd={onShowCreateModal} testId="accomplishmentsEmptyCard" />
        </RecapLayout.Content>

        <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={RecapKind.Accomplishments}>
          <AccomplishmentsForm
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
        kind={RecapKind.Accomplishments}
        className="mb-4"
      />
      <RecapsUpdateSuccessAlert
        isShowing={alertsState.isShowingUpdateSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.Accomplishments}
        className="mb-4"
      />
      <RecapsDeleteSuccessAlert
        isShowing={alertsState.isShowingDeleteSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.Accomplishments}
        className="mb-4"
      />
      <RecapsDeleteErrorAlert
        isShowing={alertsState.isShowingDeleteErrorAlert}
        onHide={hideAlert}
        kind={RecapKind.Accomplishments}
        className="mb-4"
      />
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
        <RecapLayout.HeaderTitle onClickAdd={onShowCreateModal}>Accomplishments</RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap all the great things you have done or were recognized for.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((accomplishments, key) => (
          <AccomplishmentsRecap
            accomplishments={accomplishments}
            onEdit={onClickEditRecap}
            onDelete={onClickDeleteRecap}
            key={key}
            testId="accomplishmentsRecap"
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

      <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={RecapKind.Accomplishments}>
        <AccomplishmentsForm
          initialRecap={null}
          isShowing={isShowingCreateModal}
          onHide={onHideCreateModal}
          onSaveSuccess={onSaveSuccessCreate}
        />
      </RecapsCreateModal>

      <RecapsEditModal isShowing={isShowingEditModal} onHide={onHideEditModal} kind={RecapKind.Accomplishments}>
        <AccomplishmentsForm
          initialRecap={selectedEditRecap}
          isShowing={isShowingEditModal}
          onHide={onHideEditModal}
          onSaveSuccess={onSaveSuccessEdit}
        />
      </RecapsEditModal>
    </RecapLayout.Container>
  );
};

export default AccomplishmentsLayout;
