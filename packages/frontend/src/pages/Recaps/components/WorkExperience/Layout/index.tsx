import React, { useState } from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import WorkExperienceEmptyCard from "../EmptyCard";
import WorkExperienceRecap from "../Recap";
import RecapsConfirmDeleteModal from "../../RecapsConfirmDeleteModal";
import {
  RecapsCreateSuccessAlert,
  RecapsUpdateSuccessAlert,
  RecapsDeleteSuccessAlert,
  RecapsDeleteErrorAlert,
} from "../../RecapsAlerts";
import RecapWorkExperienceForm from "../Form";
import RecapsCreateModal from "../../RecapsCreateModal";
import RecapsEditModal from "../../RecapsEditModal";
import { Recap, RecapWorkExperience, RecapKind } from "../../../recaps.interface";
import { useRecapsAlerts } from "../../../hooks/useRecapsAlerts";
import { useDeleteRecap } from "../../../hooks/useDeleteRecap";

export interface WorkExperienceLayoutProps extends RecapLayoutProps {
  recaps: RecapWorkExperience[];
}

const WorkExperienceLayout: React.FC<WorkExperienceLayoutProps> = ({
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
  const onSaveSuccessCreate = (createdRecap: RecapWorkExperience) => {
    onCreateRecapSuccess(createdRecap);
    showCreateSuccessAlert();
  };

  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const [selectedEditRecap, setSelectedEditRecap] = useState<RecapWorkExperience | null>(null);
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
  const onSaveSuccessEdit = (updatedRecap: RecapWorkExperience) => {
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
          kind={RecapKind.WorkExperience}
          className="mb-4"
        />
        <RecapsDeleteErrorAlert
          isShowing={alertsState.isShowingDeleteErrorAlert}
          onHide={hideAlert}
          kind={RecapKind.WorkExperience}
          className="mb-4"
        />
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
          <RecapLayout.HeaderTitle>Work Experience</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <WorkExperienceEmptyCard onClickAdd={onShowCreateModal} testId="workExperienceEmptyCard" />
        </RecapLayout.Content>

        <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={RecapKind.WorkExperience}>
          <RecapWorkExperienceForm
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
        kind={RecapKind.WorkExperience}
        className="mb-4"
      />
      <RecapsUpdateSuccessAlert
        isShowing={alertsState.isShowingUpdateSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.WorkExperience}
        className="mb-4"
      />
      <RecapsDeleteSuccessAlert
        isShowing={alertsState.isShowingDeleteSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.WorkExperience}
        className="mb-4"
      />
      <RecapsDeleteErrorAlert
        isShowing={alertsState.isShowingDeleteErrorAlert}
        onHide={hideAlert}
        kind={RecapKind.WorkExperience}
        className="mb-4"
      />
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
        <RecapLayout.HeaderTitle onClickAdd={onShowCreateModal}>Work Experience</RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap everything about your career from internships to full-time jobs and opportunities.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((workExperience, key) => (
          <WorkExperienceRecap
            workExperience={workExperience}
            onEdit={onClickEditRecap}
            onDelete={onClickDeleteRecap}
            key={key}
            testId="workExperienceRecap"
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

      <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={RecapKind.WorkExperience}>
        <RecapWorkExperienceForm
          initialRecap={null}
          isShowing={isShowingCreateModal}
          onHide={onHideCreateModal}
          onSaveSuccess={onSaveSuccessCreate}
        />
      </RecapsCreateModal>

      <RecapsEditModal isShowing={isShowingEditModal} onHide={onHideEditModal} kind={RecapKind.WorkExperience}>
        <RecapWorkExperienceForm
          initialRecap={selectedEditRecap}
          isShowing={isShowingEditModal}
          onHide={onHideEditModal}
          onSaveSuccess={onSaveSuccessEdit}
        />
      </RecapsEditModal>
    </RecapLayout.Container>
  );
};

export default WorkExperienceLayout;
