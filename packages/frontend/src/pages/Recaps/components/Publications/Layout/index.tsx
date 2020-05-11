import React, { useState } from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import PublicationsEmptyCard from "../EmptyCard";
import PublicationsRecap from "../Recap";
import RecapsConfirmDeleteModal from "../../RecapsConfirmDeleteModal";
import {
  RecapsCreateSuccessAlert,
  RecapsUpdateSuccessAlert,
  RecapsDeleteSuccessAlert,
  RecapsDeleteErrorAlert,
} from "../../RecapsAlerts";
import PublicationsForm from "../Form";
import RecapsCreateModal from "../../RecapsCreateModal";
import RecapsEditModal from "../../RecapsEditModal";
import { Recap, RecapPublications, RecapKind } from "../../../recaps.interface";
import { useRecapsAlerts } from "../../../hooks/useRecapsAlerts";
import { useDeleteRecap } from "../../../hooks/useDeleteRecap";

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
  const onSaveSuccessCreate = (createdRecap: RecapPublications) => {
    onCreateRecapSuccess(createdRecap);
    showCreateSuccessAlert();
  };

  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const [selectedEditRecap, setSelectedEditRecap] = useState<RecapPublications | null>(null);
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
  const onSaveSuccessEdit = (updatedRecap: RecapPublications) => {
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
          kind={RecapKind.Publications}
          className="mb-4"
        />
        <RecapsDeleteErrorAlert
          isShowing={alertsState.isShowingDeleteErrorAlert}
          onHide={hideAlert}
          kind={RecapKind.Publications}
          className="mb-4"
        />
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
          <RecapLayout.HeaderTitle>Publications</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <PublicationsEmptyCard onClickAdd={onShowCreateModal} testId="publicationsEmptyCard" />
        </RecapLayout.Content>

        <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={RecapKind.Publications}>
          <PublicationsForm
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
        kind={RecapKind.Publications}
        className="mb-4"
      />
      <RecapsUpdateSuccessAlert
        isShowing={alertsState.isShowingUpdateSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.Publications}
        className="mb-4"
      />
      <RecapsDeleteSuccessAlert
        isShowing={alertsState.isShowingDeleteSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.Publications}
        className="mb-4"
      />
      <RecapsDeleteErrorAlert
        isShowing={alertsState.isShowingDeleteErrorAlert}
        onHide={hideAlert}
        kind={RecapKind.Publications}
        className="mb-4"
      />
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
        <RecapLayout.HeaderTitle onClickAdd={onShowCreateModal}>Publications</RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap the works you published and wrote i.e. blogs, papers, books.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((publications, key) => (
          <PublicationsRecap
            publications={publications}
            onEdit={onClickEditRecap}
            onDelete={onClickDeleteRecap}
            key={key}
            testId="publicationsRecap"
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

      <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={RecapKind.Publications}>
        <PublicationsForm
          initialRecap={null}
          isShowing={isShowingCreateModal}
          onHide={onHideCreateModal}
          onSaveSuccess={onSaveSuccessCreate}
        />
      </RecapsCreateModal>

      <RecapsEditModal isShowing={isShowingEditModal} onHide={onHideEditModal} kind={RecapKind.Publications}>
        <PublicationsForm
          initialRecap={selectedEditRecap}
          isShowing={isShowingEditModal}
          onHide={onHideEditModal}
          onSaveSuccess={onSaveSuccessEdit}
        />
      </RecapsEditModal>
    </RecapLayout.Container>
  );
};

export default PublicationsLayout;
